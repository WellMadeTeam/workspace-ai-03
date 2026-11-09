import unittest
from unittest.mock import Mock, patch

from app.backend.src.services.analytics import send_event


class AnalyticsTests(unittest.TestCase):
    @patch("app.backend.src.services.analytics.httpx.post")
    @patch("app.backend.src.services.analytics.OPENPANEL_CLIENT_SECRET", "secret")
    @patch("app.backend.src.services.analytics.OPENPANEL_CLIENT_ID", "client")
    @patch("app.backend.src.services.analytics.OPENPANEL_API_URL", "http://openpanel")
    @patch("app.backend.src.services.analytics.ANALYTICS_ENABLED", True)
    def test_sends_event_properties_source_and_board_group(self, post):
        post.return_value = Mock()

        send_event(
            "query_submitted",
            {"board_id": "opaque-board", "has_ai_context": False},
            "smoke",
        )

        post.assert_called_once_with(
            "http://openpanel/track",
            headers={
                "openpanel-client-id": "client",
                "openpanel-client-secret": "secret",
            },
            json={
                "type": "track",
                "payload": {
                    "name": "query_submitted",
                    "properties": {
                        "board_id": "opaque-board",
                        "has_ai_context": False,
                        "source": "smoke",
                    },
                    "groups": ["opaque-board"],
                },
            },
            timeout=2.0,
        )
        post.return_value.raise_for_status.assert_called_once()

    @patch("app.backend.src.services.analytics.httpx.post")
    @patch("app.backend.src.services.analytics.OPENPANEL_CLIENT_SECRET", "secret")
    @patch("app.backend.src.services.analytics.OPENPANEL_CLIENT_ID", "client")
    @patch("app.backend.src.services.analytics.OPENPANEL_API_URL", "http://openpanel")
    @patch("app.backend.src.services.analytics.ANALYTICS_ENABLED", True)
    def test_event_without_board_has_no_group(self, post):
        post.return_value = Mock()

        send_event("smoke_check", {}, "smoke")

        payload = post.call_args.kwargs["json"]["payload"]
        self.assertNotIn("groups", payload)

    @patch("app.backend.src.services.analytics.httpx.post")
    @patch("app.backend.src.services.analytics.ANALYTICS_ENABLED", False)
    def test_collection_off_sends_nothing(self, post):
        send_event("query_submitted", {"board_id": "opaque-board"}, "web")

        post.assert_not_called()

    @patch(
        "app.backend.src.services.analytics.httpx.post",
        side_effect=RuntimeError("collector unavailable"),
    )
    @patch("app.backend.src.services.analytics.OPENPANEL_CLIENT_SECRET", "secret")
    @patch("app.backend.src.services.analytics.OPENPANEL_CLIENT_ID", "client")
    @patch("app.backend.src.services.analytics.OPENPANEL_API_URL", "http://openpanel")
    @patch("app.backend.src.services.analytics.ANALYTICS_ENABLED", True)
    def test_collector_failure_does_not_escape(self, post):
        with self.assertLogs("app.backend.src.services.analytics", level="WARNING"):
            send_event("query_submitted", {"board_id": "opaque-board"}, "web")

        post.assert_called_once()


if __name__ == "__main__":
    unittest.main()
