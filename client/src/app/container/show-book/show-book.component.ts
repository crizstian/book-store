import {Component} from '@angular/core'
import {BookService} from '../../services'

@Component({
  selector: 'show-book',
  styleUrls: ['./show-book.component.css'],
  templateUrl: './show-book.component.html'
})
export class ShowBook {

  books:Array<any> = []

  constructor(private bookService: BookService) {
    this.bookService.get('/bookstore')
      .subscribe((data) => this.books = data)
  }

}
