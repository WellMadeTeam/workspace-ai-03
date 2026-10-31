import unittest

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.backend.src.database import Base, get_db
from app.backend.src.models import Board, Connection, Widget
from app.backend.src.routers.connection import connection_router
from app.backend.src.routers.widget import widget_router
from app.backend.src.services.context import get_context_for_ai


class ImageWidgetTests(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine(
            "sqlite://",
            connect_args={"check_same_thread": False},
            poolclass=StaticPool,
        )
        Base.metadata.create_all(self.engine)
        self.session_factory = sessionmaker(
            bind=self.engine,
            autoflush=False,
            autocommit=False,
        )

        app = FastAPI()
        app.include_router(widget_router)
        app.include_router(connection_router)

        def get_test_db():
            db = self.session_factory()
            try:
                yield db
            finally:
                db.close()

        app.dependency_overrides[get_db] = get_test_db
        self.client = TestClient(app)

        with self.session_factory() as db:
            board = Board(title="Test board")
            db.add(board)
            db.commit()
            self.board_id = board.id

    def tearDown(self):
        self.client.close()
        Base.metadata.drop_all(self.engine)
        self.engine.dispose()

    def add_widget(self, widget_type, content=None):
        with self.session_factory() as db:
            widget = Widget(
                board_id=self.board_id,
                widget_type=widget_type,
                title=widget_type,
                content=content,
                x=0,
                y=0,
            )
            db.add(widget)
            db.commit()
            return widget.id

    def connect(self, source_id, target_id):
        with self.session_factory() as db:
            db.add(
                Connection(
                    source_widget_id=source_id,
                    target_widget_id=target_id,
                )
            )
            db.commit()

    def test_creates_an_image_widget_with_its_diagram(self):
        response = self.client.post(
            "/widgets",
            json={
                "title": "Diagram",
                "board_id": str(self.board_id),
                "widget_type": "image",
                "content": "graph TD\n  A --> B",
                "x": 10,
                "y": 20,
            },
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["widget_type"], "image")
        self.assertEqual(response.json()["content"], "graph TD\n  A --> B")

    def test_rejects_an_image_widget_without_a_diagram(self):
        response = self.client.post(
            "/widgets",
            json={
                "title": "Diagram",
                "board_id": str(self.board_id),
                "widget_type": "image",
                "x": 0,
                "y": 0,
            },
        )

        self.assertEqual(response.status_code, 422)

    def test_rejects_a_connection_from_an_ai_widget_to_an_image(self):
        ai_id = self.add_widget("ai")
        image_id = self.add_widget("image", "graph TD")

        response = self.client.post(
            "/connections",
            json={
                "source_widget_id": str(ai_id),
                "target_widget_id": str(image_id),
            },
        )

        self.assertEqual(response.status_code, 400)

    def test_connects_an_image_to_an_ai_widget(self):
        ai_id = self.add_widget("ai")
        image_id = self.add_widget("image", "graph TD")

        response = self.client.post(
            "/connections",
            json={
                "source_widget_id": str(image_id),
                "target_widget_id": str(ai_id),
            },
        )

        self.assertEqual(response.status_code, 201)

    def test_leaves_an_image_out_of_the_context_but_not_what_is_behind_it(self):
        ai_id = self.add_widget("ai")
        image_id = self.add_widget("image", "graph TD")
        text_id = self.add_widget("text", "Notes")
        self.connect(image_id, ai_id)
        self.connect(text_id, image_id)

        with self.session_factory() as db:
            documents = get_context_for_ai(db, ai_id)

        self.assertEqual([widget.id for widget in documents], [text_id])


if __name__ == "__main__":
    unittest.main()
