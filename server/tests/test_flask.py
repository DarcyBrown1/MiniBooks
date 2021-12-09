import os
import json
os.environ['FLASK_SESSION_KEY'] = 'abc123'
os.environ['DSN_TOOLSDB'] = 'host=localhost user=toolop dbname=ripit_2 sslmode=require'

# monkey patch flask_caching to work without redis during testing
from flask_caching import Cache  # noqa: E402
import flask_app.app  # noqa: E402
flask_app.app.cache = Cache(config={
    "CACHE_TYPE": "simple",
})

app = flask_app.app.load()
test_auth_header = {'X-Forwarded-User': 'test-user'}


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
