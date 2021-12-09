import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { SignInComponent } from './widgets/sign-in/sign-in.component';
import { BookCardComponent } from './widgets/book-card/book-card.component';
import { BooksComponent } from './widgets/books/books.component';
import { BookComponent } from './widgets/book/book.component';
import { ReviewEditComponent } from './widgets/review-edit/review-edit.component';
import { UserEditComponent } from './widgets/user-edit/user-edit.component';
import { ReviewComponent } from './widgets/review/review.component';
import { ReviewsComponent } from './widgets/reviews/reviews.component';
import { BookReviewsComponent } from './widgets/book-reviews/book-reviews.component';
import { ReviewCardComponent } from './widgets/review-card/review-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    BookCardComponent,
    BooksComponent,
    BookComponent,
    ReviewEditComponent,
    UserEditComponent,
    ReviewComponent,
    ReviewsComponent,
    BookReviewsComponent,
    ReviewCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
