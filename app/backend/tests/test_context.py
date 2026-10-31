import unittest

from app.backend.src.services.context import (
    ContextDocument,
    build_system_prompt,
)


class BuildSystemPromptTests(unittest.TestCase):
    def test_asks_for_mermaid_diagrams_in_a_fenced_block(self):
        prompt = build_system_prompt([])

        self.assertIn("```mermaid", prompt)

    def test_keeps_the_diagram_rule_when_context_is_given(self):
        document = ContextDocument(id="widget-id", kind="text", text="Notes")

        prompt = build_system_prompt([document])

        self.assertIn("```mermaid", prompt)
        self.assertIn('<doc id="widget-id" type="text">Notes</doc>', prompt)


if __name__ == "__main__":
    unittest.main()
