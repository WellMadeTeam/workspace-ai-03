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

    def test_generate_reply_leaves_room_for_a_diagram(self):
        client = Mock()
        client.chat.completions.create.return_value.choices = [
            SimpleNamespace(
                message=SimpleNamespace(
                    content='{"response":"Answer","references":[]}'
                )
            )
        ]

        with patch.object(ai_service, "client", client):
            ai_service.generate_reply([{"role": "user", "content": "Draw"}])

        _, kwargs = client.chat.completions.create.call_args
        self.assertGreaterEqual(kwargs["max_completion_tokens"], 2048)


if __name__ == "__main__":
    unittest.main()
