from groq import Groq

from app.backend.src.config import GROQ_API_KEY


api_key = GROQ_API_KEY

if not api_key:
    raise RuntimeError(
        "GROQ_API_KEY not found. Check backend/.env"
    )

client = Groq(api_key=api_key)


def generate_reply(
    messages: list[dict[str, str]],
    documents: list[dict] | None = None,
) -> tuple[str, list[dict] | None]:
    completion = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=messages,
        max_completion_tokens=512,
        documents=documents,
        citation_options="enabled" if documents else "disabled",
    )

    answer = completion.choices[0].message.content
    annotations = getattr(completion.choices[0].message, "annotations", None)

    if not answer:
        raise RuntimeError("The AI returned an empty response")

    # SDK objects are converted to plain dicts so they can be stored as JSON.
    references = [
        annotation.model_dump() if hasattr(annotation, "model_dump") else dict(annotation)
        for annotation in annotations
    ] if annotations else None

    return answer, references
