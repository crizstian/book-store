import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {BookService} from '../../services'

@Component({
  selector: 'edit-book',
  styleUrls: [],
  templateUrl: './edit-book.component.html'
})
export class EditBook {

  title: string = ''

  constructor(private router: Router, private bookService: BookService) {
    const route: string = this.router.url
    if (route === '/add') {
        this.title = 'Add a new book to the catalog'
    } else {
      const book = {
        id: this.getId(route)
      }
      this.title = 'Edit existing book'
      this.bookService.get('/bookstore/find', {book})
        .subscribe(data => console.log(data))
    }
  }

  getId (route) {
    return route.substr(route.indexOf('=') + 1)
  }

}
