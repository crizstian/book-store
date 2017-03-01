import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {BookService, AuthorService, CategoryService, PublisherService} from '../../services'
import {Store} from '../../store'
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

  constructor(
    private router: Router,
    private store: Store,
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private publisherService: PublisherService
  ) {
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
      this.edit = true
      this.getBook(route)
    }
  }

  getDefaults () {
    // we get the data needed from the server
    const authors = this.authorService.getAuthor({authors: {}})
    const publishers = this.publisherService.getPublisher({publisher: {}})
    const categories = this.categoryService.getCategory({category: {}})

    // we fork all the http calls and get the results e.g. promise.all
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

    // we get the book by the id
    this.bookService.getBook({book})
      .subscribe((data) => {
        const publication = this.formatDate(data[0].publication)
        Object.assign(this.book, data[0], {publication, author: data[0].author.toString()})
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
      this.bookService.addBook({book: this.book})
        .subscribe(data => this.router.navigate(['','browse']))
    } else {
      this.bookService.updateBook({book: this.book})
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
