import { Component } from '@angular/core';
import {BookService} from '../../services'


@Component({
  selector: 'main-container',
  styles: [`

  `],
  template: `
    <div class="main-container">
      <search-book
        [headTitle]="'Search a book in our database'"
        (searchObj)="searchBook($event)">
      </search-book>
      <div [hidden]="!results">
        <div *ngIf="books.length === 0">
          <h2>Books not found!</h2>
          <h4>Search another book</h4>
        </div>
        <book
          *ngFor="let book of books"
          [book]="book"
          (action)="makeAction($event)"
          >
        </book>
      </div>
    </div>
  `
})
export class Home {

  results: boolean = false
  books = []

  constructor(private bookService: BookService) {}

  searchBook (book) {
    // we get the list of books from the server
    this.bookService.getBook({book})
      .subscribe((data) => {
        this.books = data
        this.results = true
      })
  }

}
