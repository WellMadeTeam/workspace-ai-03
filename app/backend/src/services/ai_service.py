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


def generate_reply(messages: list[dict[str, str]]) -> tuple[str, list[str]]:
    if client is None:
        raise RuntimeError("GROQ_API_KEY not found. Check backend/.env")

    completion = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=messages,
        max_completion_tokens=512,
        response_format=RESPONSE_FORMAT,
    )

    content = completion.choices[0].message.content

    if not content:
        raise RuntimeError("The AI returned an empty response")

    reply = json.loads(content)
    answer = reply["response"]

    if not answer:
        raise RuntimeError("The AI returned an empty response")

    references = [reference["id"] for reference in reply["references"]]

    return answer, references
