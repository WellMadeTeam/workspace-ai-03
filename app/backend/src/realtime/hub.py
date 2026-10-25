"""Who is connected to each board, the member limit, and sending events to members."""

from typing import Any
from uuid import UUID

from fastapi import WebSocket

from app.backend.src.realtime.member import Member
from app.backend.src.realtime.utils.protocol import CloseCode, build_frame


MAX_MEMBERS_PER_BOARD = 10


class BoardFullError(Exception):
    pass


class BoardHub:
    """Tracks who is connected to each board and sends events to them.

    Every method runs on the event loop and none of them awaits, so each call
    is atomic: two members joining at once can never both take the last slot.
    """

    def __init__(self, max_members: int = MAX_MEMBERS_PER_BOARD) -> None:
        self.max_members = max_members
        self._members: dict[UUID, dict[UUID, Member]] = {}
        self._seq: dict[UUID, int] = {}

    def members(self, board_id: UUID) -> list[Member]:
        return list(self._members.get(board_id, {}).values())

    def seq(self, board_id: UUID) -> int:
        return self._seq.get(board_id, 0)

    def join(self, board_id: UUID, client_id: UUID, websocket: WebSocket) -> Member:
        """Adds a member and sends it `connection.ready`, or raises BoardFullError.

        A socket with a `client_id` already on the board replaces the old one,
        which keeps its slot, so a fast reconnect is never turned away.
        """
        members = self._members.setdefault(board_id, {})
        previous = members.get(client_id)

        if previous is None and len(members) >= self.max_members:
            raise BoardFullError

        if previous is not None:
            slot = previous.slot
            previous.close(CloseCode.REPLACED, "replaced")
        else:
            taken = {member.slot for member in members.values()}
            slot = next(slot for slot in range(self.max_members) if slot not in taken)

        member = Member(board_id=board_id, client_id=client_id, slot=slot, websocket=websocket)
        members[client_id] = member

        if previous is None:
            self.publish(board_id, "member.joined", member.public(), origin=client_id, exclude=member)

        self.send(member, "connection.ready", {
            "seq": self.seq(board_id),
            "you": member.public(),
            "members": [other.public() for other in members.values()],
            # Filled by later stages: drag locks, editing presence, AI replies.
            "locks": [],
            "editing": [],
            "ai_replies": [],
        })

        return member

    def leave(self, member: Member) -> None:
        """Removes a member, unless a newer socket of the same client replaced it."""
        members = self._members.get(member.board_id, {})
        if members.get(member.client_id) is not member:
            return

        del members[member.client_id]

        if members:
            self.publish(member.board_id, "member.left", {"client_id": str(member.client_id)}, origin=member.client_id)
        else:
            # Nobody is left to notice a gap, so the board starts over.
            del self._members[member.board_id]
            self._seq.pop(member.board_id, None)

    def publish(
        self,
        board_id: UUID,
        event_type: str,
        data: dict[str, Any],
        origin: UUID | None = None,
        exclude: Member | None = None,
    ) -> None:
        """Sends a sequenced event to every member of the board."""
        seq = self._seq.get(board_id, 0) + 1
        self._seq[board_id] = seq
        frame = build_frame(board_id, event_type, data, seq, origin)

        for member in self.members(board_id):
            if member is not exclude:
                member.enqueue(frame)

    def send(self, member: Member, event_type: str, data: dict[str, Any]) -> None:
        """Sends an unsequenced event to one member."""
        member.enqueue(build_frame(member.board_id, event_type, data, None, None))


hub = BoardHub()
