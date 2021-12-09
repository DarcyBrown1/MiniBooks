import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './widgets/books/books.component';
import { BookComponent } from './widgets/book/book.component';
import { ReviewComponent } from './widgets/review/review.component';
import { ReviewsComponent } from './widgets/reviews/reviews.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'book/:bookId', component: BookComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'review/:reviewId', component: ReviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
