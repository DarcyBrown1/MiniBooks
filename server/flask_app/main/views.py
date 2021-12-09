from flask import render_template
from . import main


@main.route("/healthz")
def healthz():
    """
    Test everything that indicates this app is healthy.
    The app may be restarted if this does not return 200.
    Failure of upstream dependencies should be handled gracefully in this app without causing this to fail.
    """
    return 'OK'


# this is for angular, which handles the routing
@main.route("/", defaults={"path": ""})
@main.route("/<path:path>")
def one_page_app(path):
    return render_template("index.html")
