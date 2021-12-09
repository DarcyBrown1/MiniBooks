import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/dataobjects/review';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/dataobjects/user';

@Component({
  selector: 'app-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.css']
})
export class ReviewEditComponent implements OnInit {

  @Input() review: Review = { rating: 0, comments: '', username: '' };
  private user: User = { username: '' };
  constructor(public modal: NgbActiveModal, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.currentUser.subscribe(
      user => this.user = user
    );
  }

  save() {
    this.review.username = this.user.username || "Anonymous";
    if (this.review.id == undefined) {
      // create a new review
      this.apiService.reviewSave(this.review).subscribe(
        () => this.modal.close(this.review)
      );
    } else {
      // update an existing review
      this.apiService.reviewUpdate(this.review).subscribe(
        () => this.modal.close(this.review)
      );;
    }
  }
}
