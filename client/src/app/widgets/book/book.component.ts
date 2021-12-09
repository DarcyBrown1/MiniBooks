import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/dataobjects/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {

  public book: Book | undefined;
  private sub: any;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      const bookId: number = params['bookId'];
      if (bookId) {
        this.apiService.bookGet(bookId).subscribe(
          result => this.book = result
        );
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
