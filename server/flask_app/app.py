import os
import logging
from flask import Flask
from csv import reader
import pathlib
from unidecode import unidecode

logging.captureWarnings(True)


def load():
    app = Flask(__name__, static_folder=None)

    # set the env variable APPLICATION_ROOT to the URL path where the app is served
    app.config["APPLICATION_ROOT"] = os.environ.get("APPLICATION_ROOT", "/")
    prefix = app.config["APPLICATION_ROOT"]
    if app.config["APPLICATION_ROOT"] == "/":
        prefix = ""

    # register the blueprint using the prefix defined in the configuration as
    # the application root.
    from .main import main
    app.logger.info("using application url prefix {}".format(prefix))
    app.register_blueprint(main, url_prefix=prefix)

    from .api import api
    api_prefix = "{}/api".format(prefix)
    app.logger.info("using api url prefix {}".format(api_prefix))
    app.register_blueprint(api, url_prefix=api_prefix)

    # log the URL paths that are registered
    for url in app.url_map.iter_rules():
        app.logger.debug(repr(url))

    return app


def load_books():
    books = []
    book_attributes = ["author", "title", "url", "coverUrl", "genres", "notes", "rating", "ratings"]
    with open(os.path.join(pathlib.Path().resolve(), "app_data", "book_data.csv"), mode="r",
              encoding="utf-8") as book_data:
        csv_reader = reader(book_data)
        header = next(csv_reader)
        if header != None:
            for row in csv_reader:
                a_book_data = zip(book_attributes, row)
                book = {data_pair[0]: unidecode(data_pair[1]) for data_pair in a_book_data}
                book["id"] = int(book["url"].rsplit("/id", 1)[1])
                books.append(book)
    return books

"""
These globals are for holding the application data
I am using them as a quick replacement for a database
"""
books = load_books()
reviews = []
