import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/dataobjects/book';
import { Review } from 'src/app/dataobjects/review';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReviewEditComponent } from '../review-edit/review-edit.component';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.css']
})
export class BookReviewsComponent implements OnInit {

  public faPen = faPen;
  public reviews: Review[] | undefined;
  @Input() book: Book | undefined;
  public newReview: Review | undefined;

  constructor(private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.reviewsGet();
  }

  reviewsGet() {
    if (this.book && this.book.id) {
      this.apiService.bookReviewsGet(this.book.id).subscribe(
        result => this.reviews = result
      );
    }
  }

  reviewAdd() {
    this.newReview = { 'rating': 0, 'bookId': this.book?.id, 'bookTitle': this.book?.title, 'comments': '' }
    const reviewEdit = this.modalService.open(ReviewEditComponent, { size: 'lg' });
    reviewEdit.componentInstance.review = this.newReview;
    reviewEdit.result.then(
      () => this.reviewsGet()
    );
  }
}
