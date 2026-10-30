import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


class AppStartupTests(unittest.TestCase):
    def test_missing_groq_key_fails_at_startup_not_import(self):
        code = """
from fastapi.testclient import TestClient
from app.backend.src.main import app

try:
    with TestClient(app):
        raise AssertionError("The application started without GROQ_API_KEY")
except RuntimeError as error:
    assert str(error) == "GROQ_API_KEY not found. Check backend/.env"
"""

        with tempfile.TemporaryDirectory() as temporary_directory:
            environment = os.environ.copy()
            environment["GROQ_API_KEY"] = ""
            environment["DATABASE_URL"] = (
                f"sqlite:///{Path(temporary_directory) / 'workspace.db'}"
            )
            result = subprocess.run(
                [sys.executable, "-c", code],
                cwd=Path(__file__).resolve().parents[3],
                env=environment,
                capture_output=True,
                text=True,
                check=False,
            )

        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)


if __name__ == "__main__":
    unittest.main()
