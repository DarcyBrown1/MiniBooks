import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Book } from 'src/app/dataobjects/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public books: Book[] | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.booksGet().subscribe(
      result => this.books = result
    );
  }
}
