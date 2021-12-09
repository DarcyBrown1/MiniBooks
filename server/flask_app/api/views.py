from . import api
from ..app import books, reviews
from flask import make_response, jsonify, request, abort
from datetime import datetime
import uuid


@api.route("/healthz")
def healthz():
    """
    Return the result of a full self diagnostic check.
    """
    return make_response(jsonify({
        "pass": True,
    }), 200)


@api.route("/books")
def books_get():
    """
    Returns a list of all books
    """
    return jsonify(books)


@api.route("/book/<int:book_id>")
def book_get(book_id):
    """
    Return a single book
    """
    filtered_books = [book for book in books if book["id"] == book_id]
    if filtered_books:
        return jsonify(filtered_books[0])
    return jsonify(None)


@api.route("/book/<int:book_id>/reviews")
def book_reviews_get(book_id):
    """
    Returns a list of all book reviews for a given book id
    Sorted by date, most recent first
    """
    filtered_reviews = [review for review in reviews if review["bookId"] == book_id]
    filtered_reviews.sort(key=lambda x: x["created"])
    filtered_reviews.reverse()
    return jsonify(filtered_reviews)


@api.route("/book/<int:book_id>/review", methods=["POST"])
def review_create(book_id):
    """
    Create a new review for this book
    """
    new_review = request.get_json().get("review")
    new_review["created"] = datetime.now()
    new_review["bookId"] = book_id
    new_review["id"] = uuid.uuid4()
    reviews.append(new_review)
    return "", 201


@api.route("/reviews/<string:user>")
def reviews_others_get(user):
    """
    Returns a list of all book reviews not written by this user
    Sorted by date, most recent first
    """
    filtered_reviews = [review for review in reviews if
                        not user or review["username"] != user]
    filtered_reviews.sort(key=lambda x: x["created"])
    filtered_reviews.reverse()
    return jsonify(filtered_reviews)


@api.route("/reviews")
def reviews_get():
    """
    Returns a list of all book reviews
    Sorted by date, most recent first
    """
    filtered_reviews = [review for review in reviews]
    filtered_reviews.sort(key=lambda x: x["created"])
    filtered_reviews.reverse()
    return jsonify(filtered_reviews)


@api.route("/review/<uuid:review_id>")
def review_get(review_id):
    """
    Returns a single review
    """
    filtered_reviews = [review for review in reviews if review["id"] == review_id]
    if filtered_reviews:
        return jsonify(filtered_reviews[0])
    return jsonify(None)


@api.route("/review/<uuid:review_id>", methods=["PUT"])
def review_update(review_id):
    """
    Updates an existing review
    """
    filtered_reviews = [review for review in reviews if review["id"] == review_id]

    if not filtered_reviews:
        abort(404)
    old_review = filtered_reviews[0]
    new_review = request.get_json().get("review")

    new_review["altered"] = datetime.now()
    #  not changing
    new_review["username"] = old_review["username"]
    new_review["created"] = old_review["created"]
    new_review["id"] = old_review["id"]

    reviews.remove(old_review)
    reviews.append(new_review)
    return "", 200


@api.route("/review/<uuid:review_id>", methods=["DELETE"])
def review_delete(review_id):
    """
    Deletes an existing review
    """
    filtered_reviews = [review for review in reviews if review["id"] == review_id]
    if not filtered_reviews:
        abort(404)
    old_review = filtered_reviews[0]
    reviews.remove(old_review)
    return "", 200
