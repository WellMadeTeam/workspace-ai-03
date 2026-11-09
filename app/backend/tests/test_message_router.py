import unittest
from types import SimpleNamespace
from unittest.mock import Mock, patch

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.backend.src.database import Base, get_db
from app.backend.src.models import Board, Connection, Message, Widget
from app.backend.src.observability import observe_http_request, request_logger
from app.backend.src.routers.message import AI_FAILURE_MESSAGE, message_router
from app.backend.src.services import context
from app.backend.src.services.context import (
    MAX_CONVERSATION_CHARS,
    MAX_SUMMARY_INPUT_CHARS,
    OMITTED_NOTE,
)


class MessageRouterTests(unittest.TestCase):
    def setUp(self):
        context.summary_cache.clear()
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
        self.request_duration_histogram = Mock()
        app.state.telemetry = SimpleNamespace(
            environment="test",
            request_duration_histogram=self.request_duration_histogram,
        )

        @app.get("/server-error-test", status_code=503)
        def server_error_test():
            return {"detail": "Service unavailable"}

        app.middleware("http")(observe_http_request)
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

    @patch("app.backend.src.routers.message.queue_event")
    @patch("app.backend.src.routers.message.generate_reply")
    def test_connected_ai_conversation_is_used_as_context(
        self, generate_reply, queue_event
    ):
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
        events = {call.args[1]: call.args[2] for call in queue_event.call_args_list}
        self.assertEqual(
            set(events),
            {
                "query_submitted",
                "context_reuse_query_submitted",
                "reply_received",
                "context_reuse_reply_received",
            },
        )
        self.assertTrue(events["query_submitted"]["has_ai_context"])
        self.assertNotIn("PELICAN-42", str(events))

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

    @patch("app.backend.src.routers.message.queue_event")
    @patch(
        "app.backend.src.routers.message.generate_reply",
        return_value=("Stored answer", []),
    )
    def test_query_and_reply_events_carry_ids_but_not_text(
        self, generate_reply, queue_event
    ):
        response = self.ask(self.widget_id)

        self.assertEqual(response.status_code, 201)
        events = {call.args[1]: call.args[2] for call in queue_event.call_args_list}
        self.assertEqual(set(events), {"query_submitted", "reply_received"})
        self.assertEqual(events["query_submitted"]["board_id"], str(self.board_id))
        self.assertEqual(
            events["query_submitted"]["query_id"],
            response.json()["user_message"]["id"],
        )
        self.assertFalse(events["query_submitted"]["has_ai_context"])
        self.assertNotIn("content", events["query_submitted"])
        self.assertNotIn("Stored answer", str(events))
        generate_reply.assert_called_once()

    @patch("app.backend.src.routers.message.queue_event")
    @patch(
        "app.backend.src.routers.message.generate_reply",
        side_effect=RuntimeError("provider failed"),
    )
    def test_failed_query_emits_server_error_without_failure_text(
        self, generate_reply, queue_event
    ):
        with patch.object(request_logger, "info") as request_log:
            response = self.ask(self.widget_id)

        self.assertEqual(response.status_code, 201)
        events = {call.args[1]: call.args[2] for call in queue_event.call_args_list}
        self.assertEqual(set(events), {"query_submitted", "query_failed"})
        self.assertNotIn("content", events["query_failed"])
        self.assertNotIn(AI_FAILURE_MESSAGE, str(events))

        log_fields = request_log.call_args.kwargs["extra"]
        self.assertEqual(log_fields["outcome"], "server_error")
        self.assertEqual(log_fields["error_type"], "RuntimeError")
        self.assertEqual(log_fields["route"], "/messages")
        self.assertEqual(
            log_fields["request_id"],
            response.headers["X-Request-ID"],
        )
        self.assertNotIn("provider failed", str(log_fields))

        self.request_duration_histogram.record.assert_called_once()
        metric_attributes = (
            self.request_duration_histogram.record.call_args.args[1]
        )
        self.assertEqual(metric_attributes["outcome"], "server_error")
        generate_reply.assert_called_once()

    def test_http_status_codes_use_client_and_server_error_outcomes(self):
        missing_widget_id = "00000000-0000-0000-0000-000000000000"

        with patch.object(request_logger, "info") as request_log:
            client_response = self.client.get(
                "/messages",
                params={"widgetId": missing_widget_id},
            )

        self.assertEqual(client_response.status_code, 404)
        self.assertEqual(
            request_log.call_args.kwargs["extra"]["outcome"],
            "client_error",
        )

        with patch.object(request_logger, "info") as request_log:
            server_response = self.client.get("/server-error-test")

        self.assertEqual(server_response.status_code, 503)
        self.assertEqual(
            request_log.call_args.kwargs["extra"]["outcome"],
            "server_error",
        )

        recorded_outcomes = [
            call.args[1]["outcome"]
            for call in self.request_duration_histogram.record.call_args_list
        ]
        self.assertEqual(recorded_outcomes, ["client_error", "server_error"])
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

    def add_long_conversation(self, widget_id):
        # Each message is long, so the conversation is over the limit.
        filler = "x" * (MAX_CONVERSATION_CHARS // 3)
        self.add_messages(
            widget_id,
            ("user", f"Oldest {filler}"),
            ("ai", f"Middle {filler}"),
            ("user", f"Newest {filler}"),
        )

    @patch("app.backend.src.services.context.summarize_conversation")
    @patch(
        "app.backend.src.routers.message.generate_reply",
        return_value=("Answer", []),
    )
    def test_short_conversation_is_not_summarized(
        self, generate_reply, summarize_conversation
    ):
        source_id = self.add_widget("ai")
        self.add_messages(source_id, ("ai", "Short conversation"))
        self.connect(source_id, self.widget_id)

        self.ask(self.widget_id)

        summarize_conversation.assert_not_called()
        self.assertIn(
            f'<doc id="{source_id}" type="ai conversation">AI: Short conversation',
            self.system_prompt(generate_reply),
        )

    @patch(
        "app.backend.src.services.context.summarize_conversation",
        return_value="Summary with PELICAN-42",
    )
    @patch(
        "app.backend.src.routers.message.generate_reply",
        return_value=("Answer", []),
    )
    def test_long_conversation_is_sent_as_a_summary(
        self, generate_reply, summarize_conversation
    ):
        source_id = self.add_widget("ai")
        self.add_long_conversation(source_id)
        self.connect(source_id, self.widget_id)

        self.ask(self.widget_id)

        prompt = self.system_prompt(generate_reply)
        self.assertIn(
            f'<doc id="{source_id}" type="ai conversation summary">'
            "Summary with PELICAN-42</doc>",
            prompt,
        )
        self.assertNotIn("Oldest", prompt)
        summary_input = summarize_conversation.call_args.args[0]
        self.assertLessEqual(len(summary_input), MAX_SUMMARY_INPUT_CHARS)

    @patch(
        "app.backend.src.services.context.summarize_conversation",
        return_value="Summary",
    )
    @patch(
        "app.backend.src.routers.message.generate_reply",
        return_value=("Answer", []),
    )
    def test_summary_is_reused_until_a_new_message(
        self, generate_reply, summarize_conversation
    ):
        source_id = self.add_widget("ai")
        self.add_long_conversation(source_id)
        self.connect(source_id, self.widget_id)

        self.ask(self.widget_id)
        self.ask(self.widget_id)
        self.assertEqual(summarize_conversation.call_count, 1)

        self.add_messages(source_id, ("ai", "New answer"))
        self.ask(self.widget_id)
        self.assertEqual(summarize_conversation.call_count, 2)

    @patch(
        "app.backend.src.services.context.summarize_conversation",
        return_value="Summary",
    )
    @patch(
        "app.backend.src.routers.message.generate_reply",
        return_value=("Answer", []),
    )
    def test_summary_is_redone_after_an_earlier_message_is_deleted(
        self, generate_reply, summarize_conversation
    ):
        source_id = self.add_widget("ai")
        self.add_long_conversation(source_id)
        # Another long message keeps it over the limit after the deletion.
        filler = "x" * (MAX_CONVERSATION_CHARS // 3)
        self.add_messages(source_id, ("ai", f"Last {filler}"))
        self.connect(source_id, self.widget_id)

        self.ask(self.widget_id)
        self.assertEqual(summarize_conversation.call_count, 1)

        with self.session_factory() as db:
            oldest_id = db.scalars(
                select(Message.id).where(
                    Message.widget_id == source_id,
                    Message.content.startswith("Oldest"),
                )
            ).one()
        response = self.client.delete(f"/messages/{oldest_id}")
        self.assertEqual(response.status_code, 204)

        self.ask(self.widget_id)
        self.assertEqual(summarize_conversation.call_count, 2)
        self.assertNotIn(
            "Oldest",
            summarize_conversation.call_args.args[0],
        )

    @patch(
        "app.backend.src.services.context.summarize_conversation",
        side_effect=RuntimeError("Rate limit"),
    )
    @patch(
        "app.backend.src.routers.message.generate_reply",
        return_value=("Answer", []),
    )
    def test_failed_summary_falls_back_to_recent_messages(
        self, generate_reply, summarize_conversation
    ):
        source_id = self.add_widget("ai")
        self.add_long_conversation(source_id)
        self.connect(source_id, self.widget_id)

        with self.assertLogs("app.backend.src.services.context", "ERROR"):
            response = self.ask(self.widget_id)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["reply"]["content"], "Answer")
        prompt = self.system_prompt(generate_reply)
        self.assertIn(OMITTED_NOTE, prompt)
        self.assertIn("User: Newest", prompt)
        self.assertNotIn("Oldest", prompt)

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
