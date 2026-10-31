import json

from groq import Groq

from app.backend.src.config import GROQ_API_KEY


api_key = GROQ_API_KEY

client = Groq(api_key=api_key) if api_key else None


# The model replies with this JSON in message.content: the answer itself and the
# ids of the connected widgets it used.
RESPONSE_FORMAT = {
    "type": "json_schema",
    "json_schema": {
        "name": "ai_reply",
        "strict": True,
        "schema": {
            "type": "object",
            "properties": {
                "response": {"type": "string"},
                "references": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {"type": "string"},
                        },
                        "required": ["id"],
                        "additionalProperties": False,
                    },
                },
            },
            "required": ["response", "references"],
            "additionalProperties": False,
        },
    },
}


def unescape_line_breaks(answer: str) -> str:
    # The model sometimes escapes the line breaks in its JSON twice, so the
    # answer holds a backslash and an "n" instead of each line break, and a
    # Mermaid fence never starts a line. An answer that has real line breaks
    # is left alone, as any escaped one in it is meant, such as in code.
    if "\n" in answer or "\\n" not in answer:
        return answer

    return (
        answer.replace("\\r\\n", "\n")
        .replace("\\n", "\n")
        .replace("\\t", "\t")
    )


def generate_reply(messages: list[dict[str, str]]) -> tuple[str, list[str]]:
    if client is None:
        raise RuntimeError("GROQ_API_KEY not found. Check backend/.env")

    completion = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=messages,
        # The model reasons before it answers, and a Mermaid diagram inside
        # the JSON reply does not fit in fewer tokens.
        max_completion_tokens=2048,
        response_format=RESPONSE_FORMAT,
    )

    content = completion.choices[0].message.content

    if not content:
        raise RuntimeError("The AI returned an empty response")

    reply = json.loads(content)
    answer = unescape_line_breaks(reply["response"])

    if not answer:
        raise RuntimeError("The AI returned an empty response")

    references = [reference["id"] for reference in reply["references"]]

    return answer, references
