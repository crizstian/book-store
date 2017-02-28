import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {BookService} from '../../services'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

@Component({
  selector: 'edit-book',
  styleUrls: ['./edit-book.component.css'],
  templateUrl: './edit-book.component.html'
})
export class EditBook {

  pageTitle: string = ''

  action: string = ''

  edit: boolean = false

  authors = []

  publishers = []

  categories = []

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
    this.getDefaults()
  }

  setTitle (route) {
    if (route === '/add') {
        this.pageTitle = 'Add a new book to the catalog'
        this.action = 'Submit'
    } else {
      this.pageTitle = 'Edit existing book'
      this.action = 'Update'
      this.getBook(route)
      this.edit = true
    }
  }

  getDefaults () {
    const authors = this.bookService.get('/author/find', {authors: {}})
    const publishers = this.bookService.get('/publisher/find', {publisher: {}})
    const categories = this.bookService.get('/category/find', {category: {}})

    Observable.forkJoin([authors, publishers, categories])
      .subscribe(results => {
        this.authors = results[0]
        this.publishers = results[1]
        this.categories = results[2]
      })
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
