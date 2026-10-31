import unittest
from types import SimpleNamespace
from unittest.mock import Mock, patch

from app.backend.src.services import ai_service


class AiServiceTests(unittest.TestCase):
    def test_generate_reply_parses_answer_and_context_references(self):
        client = Mock()
        client.chat.completions.create.return_value.choices = [
            SimpleNamespace(
                message=SimpleNamespace(
                    content=(
                        '{"response":"Answer","references":'
                        '[{"id":"widget-id"}]}'
                    )
                )
            )
        ]

        with patch.object(ai_service, "client", client):
            answer, references = ai_service.generate_reply(
                [{"role": "user", "content": "Question"}]
            )

        self.assertEqual(answer, "Answer")
        self.assertEqual(references, ["widget-id"])
        client.chat.completions.create.assert_called_once()

    def test_summarize_conversation_returns_the_summary(self):
        client = Mock()
        client.chat.completions.create.return_value.choices = [
            SimpleNamespace(message=SimpleNamespace(content="Summary"))
        ]

        with patch.object(ai_service, "client", client):
            summary = ai_service.summarize_conversation("User: Question")

        self.assertEqual(summary, "Summary")
        client.chat.completions.create.assert_called_once()

    def test_summarize_conversation_fails_on_an_empty_summary(self):
        client = Mock()
        client.chat.completions.create.return_value.choices = [
            SimpleNamespace(message=SimpleNamespace(content=""))
        ]

        with patch.object(ai_service, "client", client):
            with self.assertRaises(RuntimeError):
                ai_service.summarize_conversation("User: Question")


if __name__ == "__main__":
    unittest.main()
