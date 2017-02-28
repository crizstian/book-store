import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {BookService} from '../../services'

@Component({
  selector: 'show-book',
  styleUrls: ['./show-book.component.css'],
  templateUrl: './show-book.component.html'
})
export class ShowBook {

  books:Array<any> = []

  constructor(private bookService: BookService, private router: Router) {
    this.bookService.get('/bookstore/find', {book: {}})
      .subscribe((data) => this.books = data)
  }

  findBook (id) {
     const index: number = this.books.findIndex((book) => book._id === id)
    return this.books[index]
  }

  makeAction({id='', action=''} = {}) {
    switch(action) {
      case 'view':
        this.router.navigate(['','view', {id}])
      break
      case 'edit':
        this.router.navigate(['','edit', {id}])
      break
      case 'delete':
        this.bookService.delete(`/bookstore/${id}`)
      break
    }
  }


}
