from fastapi import TestClient
from main import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200


def test_route_endpoint():
    response = client.post(
        "/route",
        json={
            "start_id": 1,
            "end_id": 3
        }
    )

    assert response.status_code in [200, 422]
