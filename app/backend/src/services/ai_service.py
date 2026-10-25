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
    context: list[str] | None = None,
) -> str:
    if context:
        context_text = "\n".join(context)
        system_message = {
            "role": "system",
            "content": (
                "You are a helpful assistant in Workspace for AI Collaboration. "
                "Be clear and concise.\n\n"
                "Context from connected widgets:\n"
                f"{context_text}"
            ),
        }
        messages = [system_message] + messages

    completion = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=messages,
        max_completion_tokens=512,
    )

    answer = completion.choices[0].message.content

    if not answer:
        raise RuntimeError("The AI returned an empty response")

    return answer
