import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/dataobjects/review';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/dataobjects/book';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/dataobjects/user';
import { ReviewEditComponent } from '../review-edit/review-edit.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review | undefined;
  public book: Book | undefined;
  private sub: any;
  public faPen = faPen;
  public faTrash = faTrash;
  public user: User = { username: '' };

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.apiService.currentUser.subscribe(
      user => this.user = user
    );

    this.sub = this.activatedRoute.params.subscribe(params => {
      const reviewId: string = params['reviewId'];
      if (reviewId) {
        // using this widget on a route
        this.apiService.reviewGet(reviewId).subscribe(
          result => {
            this.review = result;
            if (this.review && this.review.bookId) {
              this.apiService.bookGet(this.review.bookId).subscribe(
                result => {
                  this.book = result;
                }
              )
            }
          }
        );
      } else if (this.review != undefined) {
        // using this widget in a listing
        if (this.review && this.review.bookId) {
          this.apiService.bookGet(this.review.bookId).subscribe(
            result => {
              this.book = result;
            }
          )
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  reviewEdit() {
    const reviewEdit = this.modalService.open(ReviewEditComponent, { size: 'lg' });
    reviewEdit.componentInstance.review = this.review;
    reviewEdit.result.then(
      result => this.review = result
    );
  }

  reviewDelete() {
    if (this.review) {
      const bookId = this.review.bookId;
      this.apiService.reviewDelete(this.review).subscribe(
        () => this.router.navigate(['/book', bookId])
      )
    }
  }
}
