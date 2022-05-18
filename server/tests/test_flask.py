import json
import flask_app.app  # noqa: E402

app = flask_app.app.load()


def test_health_check():
    with app.test_client() as c:
        rv = c.get(path='/healthz')
        assert b'OK' in rv.data and rv.status_code == 200


def test_api_health_check():
    with app.test_client() as c:
        rv = c.get(path='/api/healthz')
        value = json.loads(rv.data)
        assert {"pass": True} == value and rv.status_code == 200


def test_api_books_get():
    with app.test_client() as c:
        rv = c.get(path='/api/books')
        value = json.loads(rv.data)
        assert rv.status_code == 200
        assert isinstance(value, list)
        assert value[0]["id"] == 1571283566
