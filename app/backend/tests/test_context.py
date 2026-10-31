import unittest
from types import SimpleNamespace

from app.backend.src.services.context import build_system_prompt


class BuildSystemPromptTests(unittest.TestCase):
    def test_asks_for_mermaid_diagrams_in_a_fenced_block(self):
        prompt = build_system_prompt([])

        self.assertIn("```mermaid", prompt)

    def test_keeps_the_diagram_rule_when_context_is_given(self):
        widget = SimpleNamespace(id="widget-id", content="Notes")

        prompt = build_system_prompt([widget])

        self.assertIn("```mermaid", prompt)
        self.assertIn('<doc id="widget-id">Notes</doc>', prompt)


if __name__ == "__main__":
    unittest.main()
