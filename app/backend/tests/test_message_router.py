import unittest
from unittest.mock import patch

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.backend.src.database import Base, get_db
from app.backend.src.models import Board, Widget
from app.backend.src.routers.message import message_router


class MessageRouterTests(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine(
            "sqlite://",
            connect_args={"check_same_thread": False},
            poolclass=StaticPool,
        )
        Base.metadata.create_all(self.engine)
        self.session_factory = sessionmaker(
            bind=self.engine,
            autoflush=False,
            autocommit=False,
        )

        app = FastAPI()
        app.include_router(message_router)

        def get_test_db():
            db = self.session_factory()
            try:
                yield db
            finally:
                db.close()

        app.dependency_overrides[get_db] = get_test_db
        self.client = TestClient(app)

        with self.session_factory() as db:
            board = Board(title="Test board")
            db.add(board)
            db.flush()
            widget = Widget(
                board_id=board.id,
                widget_type="ai",
                title="AI",
                x=0,
                y=0,
            )
            db.add(widget)
            db.commit()
            self.widget_id = widget.id

    def tearDown(self):
        self.client.close()
        Base.metadata.drop_all(self.engine)
        self.engine.dispose()

    @patch(
        "app.backend.src.routers.message.generate_reply",
        return_value=("Stored answer", []),
    )
    def test_query_and_reply_are_stored_and_returned(self, generate_reply):
        response = self.client.post(
            "/messages",
            json={"widget_id": str(self.widget_id), "content": "Question"},
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["user_message"]["content"], "Question")
        self.assertEqual(response.json()["reply"]["content"], "Stored answer")

        messages_response = self.client.get(
            "/messages",
            params={"widgetId": str(self.widget_id)},
        )

        self.assertEqual(messages_response.status_code, 200)
        self.assertEqual(
            [message["content"] for message in messages_response.json()["items"]],
            ["Question", "Stored answer"],
        )
        generate_reply.assert_called_once()


if __name__ == "__main__":
    unittest.main()
