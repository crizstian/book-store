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
  filters: any = {}

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
    this.getBooks()
  }

  makeAction ({id='', action=''} = {}) {
    switch(action) {
      case 'view':
        this.router.navigate(['','view', id])
      break
      case 'edit':
        this.router.navigate(['','edit', id])
      break
      case 'delete':
        this.bookService.deleteBook(id)
          .subscribe(data => {
            this.books = this.books.filter(({_id}) => _id !== id)
            console.log(this.books)
          })
      break
    }
  }

  getBooks () {
    // we get the list of books from the server
    this.bookService.getBook({book: {}})
      .subscribe((data) => {
        this.books = data
      })
  }

  searchBook(book) {
    this.filters = book
  }

}
