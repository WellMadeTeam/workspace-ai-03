import unittest
from unittest.mock import patch

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.backend.src.database import Base, get_db
from app.backend.src.models import Board, Connection, Message, Widget
from app.backend.src.routers.message import AI_FAILURE_MESSAGE, message_router


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
            self.board_id = board.id
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

    def add_widget(self, widget_type, content=None):
        with self.session_factory() as db:
            widget = Widget(
                board_id=self.board_id,
                widget_type=widget_type,
                title=widget_type,
                content=content,
                x=0,
                y=0,
            )
            db.add(widget)
            db.commit()
            return widget.id

    def add_messages(self, widget_id, *messages):
        with self.session_factory() as db:
            for role, content in messages:
                db.add(Message(widget_id=widget_id, role=role, content=content))
                # Separate commits keep the messages in the order given.
                db.commit()

    def connect(self, source_id, target_id):
        with self.session_factory() as db:
            db.add(Connection(
                source_widget_id=source_id,
                target_widget_id=target_id,
            ))
            db.commit()

    def ask(self, widget_id):
        return self.client.post(
            "/messages",
            json={"widget_id": str(widget_id), "content": "What is the code word?"},
        )

    @staticmethod
    def system_prompt(generate_reply):
        messages = generate_reply.call_args.args[0]
        return messages[0]["content"]

    @patch("app.backend.src.routers.message.generate_reply")
    def test_connected_ai_conversation_is_used_as_context(self, generate_reply):
        source_id = self.add_widget("ai")
        self.add_messages(
            source_id,
            ("user", "Remember the code word."),
            ("ai", "The code word is PELICAN-42."),
        )
        self.connect(source_id, self.widget_id)
        generate_reply.return_value = ("PELICAN-42", [str(source_id)])

        response = self.ask(self.widget_id)

        self.assertEqual(response.status_code, 201)
        prompt = self.system_prompt(generate_reply)
        self.assertIn(
            "User: Remember the code word.\nAI: The code word is PELICAN-42.",
            prompt,
        )
        self.assertIn('type="ai conversation"', prompt)
        self.assertTrue(response.json()["reply"]["has_context"])
        self.assertEqual(response.json()["reply"]["references"], [str(source_id)])

    @patch(
        "app.backend.src.routers.message.generate_reply",
        return_value=("I do not know", []),
    )
    def test_unconnected_ai_block_gets_no_conversation(self, generate_reply):
        source_id = self.add_widget("ai")
        self.add_messages(source_id, ("ai", "The code word is PELICAN-42."))

        response = self.ask(self.widget_id)

        self.assertEqual(response.status_code, 201)
        self.assertNotIn("PELICAN-42", self.system_prompt(generate_reply))
        self.assertFalse(response.json()["reply"]["has_context"])

    @patch(
        "app.backend.src.routers.message.generate_reply",
        return_value=("Answer", []),
    )
    def test_system_messages_are_left_out_of_the_context(self, generate_reply):
        source_id = self.add_widget("ai")
        self.add_messages(
            source_id,
            ("user", "Question"),
            ("system", "The AI couldn't answer this query."),
        )
        self.connect(source_id, self.widget_id)

        self.ask(self.widget_id)

        prompt = self.system_prompt(generate_reply)
        self.assertIn("User: Question", prompt)
        self.assertNotIn("couldn't answer", prompt)

    @patch(
        "app.backend.src.routers.message.generate_reply",
        return_value=("Answer", []),
    )
    def test_ai_block_without_messages_adds_no_context(self, generate_reply):
        source_id = self.add_widget("ai")
        self.connect(source_id, self.widget_id)

        response = self.ask(self.widget_id)

        self.assertNotIn("<doc", self.system_prompt(generate_reply))
        self.assertFalse(response.json()["reply"]["has_context"])

    @patch(
        "app.backend.src.routers.message.generate_reply",
        return_value=("Answer", []),
    )
    def test_context_reaches_through_a_chain_of_ai_blocks(self, generate_reply):
        text_id = self.add_widget("text", content="Text block note")
        middle_id = self.add_widget("ai")
        self.add_messages(middle_id, ("ai", "Middle conversation"))
        self.connect(text_id, middle_id)
        self.connect(middle_id, self.widget_id)

        self.ask(self.widget_id)

        prompt = self.system_prompt(generate_reply)
        self.assertIn(f'<doc id="{middle_id}" type="ai conversation">', prompt)
        self.assertIn(f'<doc id="{text_id}" type="text">Text block note', prompt)

    def post_query(self, content):
        return self.client.post(
            "/messages",
            json={"widget_id": str(self.widget_id), "content": content},
        )

    @patch(
        "app.backend.src.routers.message.generate_reply",
        side_effect=[RuntimeError("down"), ("Answer", [])],
    )
    def test_retried_query_is_sent_once(self, generate_reply):
        with self.assertLogs("app.backend.src.routers.message", "ERROR"):
            self.post_query("Question")
        self.post_query("Question")

        ai_messages = generate_reply.call_args.args[0]

        self.assertEqual(ai_messages[0]["role"], "system")
        self.assertEqual(
            ai_messages[1:],
            [{"role": "user", "content": "Question"}],
        )

    @patch(
        "app.backend.src.routers.message.generate_reply",
        side_effect=[("Answer 1", []), ("Answer 2", [])],
    )
    def test_answered_query_stays_in_history(self, generate_reply):
        self.post_query("Question 1")
        self.post_query("Question 2")

        ai_messages = generate_reply.call_args.args[0]

        self.assertEqual(
            ai_messages[1:],
            [
                {"role": "user", "content": "Question 1"},
                {"role": "assistant", "content": "Answer 1"},
                {"role": "user", "content": "Question 2"},
            ],
        )

    @patch(
        "app.backend.src.routers.message.generate_reply",
        side_effect=[RuntimeError("down"), ("Answer", [])],
    )
    def test_failed_query_is_still_listed(self, generate_reply):
        with self.assertLogs("app.backend.src.routers.message", "ERROR"):
            self.post_query("Question")
        self.post_query("Question")

        messages_response = self.client.get(
            "/messages",
            params={"widgetId": str(self.widget_id)},
        )

        self.assertEqual(messages_response.status_code, 200)
        self.assertEqual(
            [
                (message["role"], message["content"])
                for message in messages_response.json()["items"]
            ],
            [
                ("user", "Question"),
                ("system", AI_FAILURE_MESSAGE),
                ("user", "Question"),
                ("ai", "Answer"),
            ],
        )


if __name__ == "__main__":
    unittest.main()
