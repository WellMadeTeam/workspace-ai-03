
import os
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq


ENV_FILE = Path(__file__).resolve().parent / ".env"
load_dotenv(ENV_FILE)

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise RuntimeError(
        "GROQ_API_KEY not found. Check backend/.env"
    )

client = Groq(api_key=api_key)


def generate_reply(messages: list[dict[str, str]]) -> str:

    completion = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=messages,
        max_completion_tokens=512,
    )

    answer = completion.choices[0].message.content

    if not answer:
        raise RuntimeError("The AI returned an empty response")

    return answer
