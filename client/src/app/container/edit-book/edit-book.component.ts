import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {BookService} from '../../services'

@Component({
  selector: 'edit-book',
  styleUrls: ['./edit-book.component.css'],
  templateUrl: './edit-book.component.html'
})
export class EditBook {

  pageTitle: string = ''

  edit: boolean = false

  book = {
    title: '',
    author: '',
    category: '',
    publication: '',
    isbn: '',
    publisher: '',
    price: ''
  }

  constructor(private router: Router, private bookService: BookService) {
    const route: string = this.router.url
    this.setTitle(route)
  }

  setTitle (route) {
    if (route === '/add') {
        this.pageTitle = 'Add a new book to the catalog'
    } else {
      this.pageTitle = 'Edit existing book'
      this.getBook(route)
      this.edit = true
    }
  }

  getId (route) {
    return route.substr(route.indexOf('=') + 1)
  }

  getBook (route) {
    const book = {
      id: this.getId(route)
    }

    this.bookService.get('/bookstore/find', {book})
      .subscribe(data => {
        const publication = this.formatDate(data[0].publication)
        Object.assign(this.book, data[0], {publication, author: data[0].author.toString()})
        console.log(this.book)
      })
  }

   formatDate(date) {
     const d = new Date(date)
     let month = '' + (d.getMonth() + 1)
     let day = '' + d.getDate()
     const year = d.getFullYear()

     if (month.length < 2) {
       month = '0' + month
     }
     if (day.length < 2) {
       day = '0' + day
     }

     return [year, month, day].join('-');
 }

  sendBook (edit) {
    if (!edit) {
      this.bookService.post('/bookstore', {book: this.book})
        .subscribe(data => this.router.navigate(['','browse']))
    } else {
      this.bookService.put('/bookstore', {book: this.book})
        .subscribe(data => this.router.navigate(['','browse']))
    }
  }

  reset () {
    this.book = {
      title: '',
      author: '',
      category: '',
      publication: '',
      isbn: '',
      publisher: '',
      price: ''
    }
  }

}
