import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/dataobjects/review';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  public reviews: Review[] | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.currentUser.subscribe(
      user => {
        this.apiService.reviewsGet(user).subscribe(
          result => this.reviews = result
        )
      }
    );
  }
}
