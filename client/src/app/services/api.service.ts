import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../dataobjects/user';
import { Book } from '../dataobjects/book';
import { Review } from '../dataobjects/review';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // This service executes all REST call's
  // All calls are to our private backend api
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  // I am just going to Stub out the sign in right here

  private user = new BehaviorSubject<User>({ username: '' });
  currentUser = this.user.asObservable();

  signIn(user: User): void {
    this.user.next(user);
  }

  signOut(): void {
    this.user.next({ username: '' });
  }

  booksGet(): Observable<Book[]> {
    const url = `${this.apiUrl}/books`;
    return this.http.get<Book[]>(url);
  }

  bookGet(bookId: number): Observable<Book> {
    const url = `${this.apiUrl}/book/${bookId}`;
    return this.http.get<Book>(url);
  }

  reviewGet(reviewId: string): Observable<Review> {
    const url = `${this.apiUrl}/review/${reviewId}`;
    return this.http.get<Review>(url);
  }

  bookReviewsGet(bookId: number): Observable<Review[]> {
    const url = `${this.apiUrl}/book/${bookId}/reviews`;
    return this.http.get<Review[]>(url);
  }

  reviewSave(review: Review): Observable<String> {
    const bookId = review.bookId;
    const url = `${this.apiUrl}/book/${bookId}/review`;
    const post_data = { 'review': review };
    return this.http.post<String>(url, post_data, httpOptions);
  }

  reviewUpdate(review: Review): Observable<String> {
    const reviewId = review.id;
    const url = `${this.apiUrl}/review/${reviewId}`;
    const put_data = { 'review': review };
    return this.http.put<String>(url, put_data, httpOptions);
  }

  reviewDelete(review: Review): Observable<String> {
    const reviewId = review.id;
    const url = `${this.apiUrl}/review/${reviewId}`;
    return this.http.delete<String>(url);
  }

  reviewsGet(user: User): Observable<Review[]> {
    const username = user.username;
    let url = `${this.apiUrl}/reviews/${username}`;
    if (username.length == 0) {
      url = `${this.apiUrl}/reviews`;
    }
    return this.http.get<Review[]>(url);
  }
}
