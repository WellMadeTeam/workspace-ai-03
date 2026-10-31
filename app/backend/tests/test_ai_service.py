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

    def test_generate_reply_restores_line_breaks_escaped_twice(self):
        # The JSON the model sent, which escapes each line break twice.
        client = Mock()
        client.chat.completions.create.return_value.choices = [
            SimpleNamespace(
                message=SimpleNamespace(
                    content=(
                        '{"response":"Here is a diagram:\\\\n```mermaid'
                        '\\\\nflowchart TD\\\\n    A --> B\\\\n```",'
                        '"references":[]}'
                    )
                )
            )
        ]

        with patch.object(ai_service, "client", client):
            answer, _ = ai_service.generate_reply(
                [{"role": "user", "content": "Draw"}]
            )

        self.assertEqual(
            answer,
            "Here is a diagram:\n```mermaid\nflowchart TD\n    A --> B\n```",
        )

    def test_unescape_line_breaks_keeps_escapes_meant_as_text(self):
        answer = 'Use:\nprint("a\\nb")'

        self.assertEqual(ai_service.unescape_line_breaks(answer), answer)


if __name__ == "__main__":
    unittest.main()
