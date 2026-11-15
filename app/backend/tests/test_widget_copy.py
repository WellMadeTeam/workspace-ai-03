import unittest
from datetime import datetime, timezone
from uuid import UUID

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event, select
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.backend.src.database import Base, get_db
from app.backend.src.models import Board, Connection, Message, Widget
from app.backend.src.routers.widget import widget_router


class WidgetCopyTests(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine(
            "sqlite://", poolclass=StaticPool, connect_args={"check_same_thread": False}
        )
        Base.metadata.create_all(self.engine)
        self.sessions = sessionmaker(bind=self.engine, autoflush=False)
        app = FastAPI()
        app.include_router(widget_router)

        def database():
            with self.sessions() as db:
                yield db

        app.dependency_overrides[get_db] = database
        self.client = TestClient(app)
        with self.sessions() as db:
            board = Board(title="Board")
            other = Board(title="Other board")
            db.add_all([board, other])
            db.flush()
            text = Widget(
                board_id=board.id,
                widget_type="text",
                title="Notes",
                content="Original text",
                x=10,
                y=20,
            )
            ai = Widget(
                board_id=board.id, widget_type="ai", title="Conversation", x=50, y=60
            )
            image = Widget(
                board_id=board.id,
                widget_type="image",
                title="Diagram",
                content="graph TD\n A --> B",
                x=90,
                y=100,
            )
            foreign = Widget(board_id=other.id, widget_type="text", title="Foreign")
            db.add_all([text, ai, image, foreign])
            db.flush()
            connection = Connection(source_widget_id=text.id, target_widget_id=ai.id)
            db.add(connection)
            # A tie deliberately exercises ordering by ID, regardless of insertion order.
            for index, role in enumerate(["user", "ai", "user", "system"]):
                db.add(
                    Message(
                        id=UUID(int=index + 1),
                        widget_id=ai.id,
                        role=role,
                        content=f"Message {index}",
                        has_context=role == "ai",
                        references=[str(text.id)] if role == "ai" else [],
                        created_at=datetime(2026, 1, 1, tzinfo=timezone.utc),
                    )
                )
            db.commit()
            self.board = str(board.id)
            self.text, self.ai, self.image, self.foreign = map(
                str, [text.id, ai.id, image.id, foreign.id]
            )
            self.connection = str(connection.id)

    def tearDown(self):
        self.client.close()
        self.engine.dispose()

    def copy(self, ids, connections=(), **overrides):
        payload = {
            "board_id": self.board,
            "items": [{"source_widget_id": id, "x": 140, "y": 240} for id in ids],
            "connection_ids": list(connections),
            **overrides,
        }
        return self.client.post("/widgets/copy", json=payload)

    def test_copies_all_types_history_and_selected_connection(self):
        response = self.copy([self.text, self.ai, self.image], [self.connection])
        self.assertEqual(response.status_code, 201, response.text)
        copies = response.json()["items"]
        self.assertEqual([w["widget_type"] for w in copies], ["text", "ai", "image"])
        self.assertEqual(copies[0]["content"], "Original text")
        self.assertEqual(copies[2]["content"], "graph TD\n A --> B")
        self.assertTrue(all(w["x"] == 140 and w["y"] == 240 for w in copies))
        self.assertFalse({w["id"] for w in copies} & {self.text, self.ai, self.image})
        connection = response.json()["connections"][0]
        self.assertNotEqual(connection["id"], self.connection)
        self.assertEqual(connection["source_widget_id"], copies[0]["id"])
        self.assertEqual(connection["target_widget_id"], copies[1]["id"])
        with self.sessions() as db:
            messages = db.scalars(
                select(Message)
                .where(Message.widget_id == UUID(copies[1]["id"]))
                .order_by(Message.created_at, Message.id)
            ).all()
            self.assertEqual(
                [m.role for m in messages], ["user", "ai", "user", "system"]
            )
            self.assertEqual(
                [m.content for m in messages], [f"Message {i}" for i in range(4)]
            )
            self.assertFalse(
                {m.id for m in messages} & {UUID(int=i) for i in range(1, 5)}
            )
            self.assertTrue(messages[1].has_context)
            self.assertEqual(messages[1].references, [self.text])
            # Clearing and editing a copy cannot mutate the original.
            db.get(Widget, UUID(copies[0]["id"])).content = "Changed"
            for message in messages:
                db.delete(message)
            db.commit()
            self.assertEqual(db.get(Widget, UUID(self.text)).content, "Original text")
            self.assertEqual(
                len(
                    db.scalars(
                        select(Message).where(Message.widget_id == UUID(self.ai))
                    ).all()
                ),
                4,
            )

    def test_does_not_copy_unselected_connections(self):
        response = self.copy([self.text, self.ai])
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["connections"], [])

    def test_rejects_connection_without_both_endpoints_without_partial_copies(self):
        for ids in ([self.text], [self.ai], [self.image]):
            response = self.copy(ids, [self.connection])
            self.assertEqual(response.status_code, 400)
        self.assert_original_count()

    def test_rejects_missing_and_foreign_sources_without_partial_copies(self):
        self.assertEqual(self.copy([self.text, str(UUID(int=100))]).status_code, 404)
        self.assertEqual(self.copy([self.text, self.foreign]).status_code, 400)
        self.assertEqual(self.copy([self.text], [str(UUID(int=100))]).status_code, 404)
        self.assert_original_count()

    def test_rejects_empty_duplicate_and_invalid_requests(self):
        self.assertEqual(self.copy([]).status_code, 422)
        self.assertEqual(self.copy([self.text, self.text]).status_code, 422)
        self.assertEqual(
            self.copy(
                [self.text, self.ai], [self.connection, self.connection]
            ).status_code,
            422,
        )
        self.assertEqual(
            self.copy([self.text], board_id=str(UUID(int=100))).status_code, 404
        )
        self.assert_original_count()

    def test_repeated_pastes_have_independent_ids(self):
        first = self.copy([self.ai]).json()["items"][0]["id"]
        second = self.copy([self.ai]).json()["items"][0]["id"]
        self.assertNotEqual(first, second)

    def test_rolls_back_blocks_when_copying_messages_fails(self):
        def reject_message(mapper, connection, target):
            raise RuntimeError("Simulated storage failure")

        event.listen(Message, "before_insert", reject_message)
        try:
            with self.assertRaisesRegex(RuntimeError, "Simulated storage failure"):
                self.copy([self.text, self.ai], [self.connection])
        finally:
            event.remove(Message, "before_insert", reject_message)
        self.assert_original_count()

    def assert_original_count(self):
        with self.sessions() as db:
            self.assertEqual(len(db.scalars(select(Widget)).all()), 4)
            self.assertEqual(len(db.scalars(select(Connection)).all()), 1)
            self.assertEqual(len(db.scalars(select(Message)).all()), 4)


if __name__ == "__main__":
    unittest.main()
