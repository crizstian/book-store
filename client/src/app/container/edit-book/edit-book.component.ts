import {Component, ViewChild} from '@angular/core'
import {Router, ActivatedRoute} from '@angular/router'
import {BookService, AuthorService, CategoryService, PublisherService} from '../../services'
import {Store} from '../../store'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/forkJoin'
import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

@Component({
  selector: 'edit-book',
  styleUrls: ['./edit-book.component.css'],
  templateUrl: './edit-book.component.html'
})
export class EditBook {
  @ViewChild('bookForm') book

  pageTitle: string = ''

  action: string = ''

  edit: boolean = false
  dateValidation: boolean = false

  authors = []

  publishers = []

  categories = []

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private store: Store,
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private publisherService: PublisherService
  ) {
    const {url} = this.router
    this.setTitle(url)
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

  getBook (route) {
    const book = {
      id: this.route.snapshot.params['id']
    }

    // we get the book by the id
    this.bookService.getBook({book})
      .subscribe((data) => {
        const publication = this.formatDate(data[0].publication)
        const b = Object.assign({}, data[0], {publication, author: data[0].author.toString()})
        delete b._id
        this.book.setValue({book: b})
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

 verifyDate (date) {
   const currentDate = new Date()
   const selectedDate = new Date(date)

   if (currentDate < selectedDate) {
    const book = Object.assign({}, this.book.value)
    Object.assign(book.book, {publication: ''})
    this.book.setValue(book)
   }

 }

  sendBook (bookForm, edit) {
    if (!edit) {
      this.bookService.addBook(bookForm)
        .subscribe(data => this.router.navigate(['','browse']))
    } else {
      const book = Object.assign({}, bookForm.book, {id: this.route.snapshot.params['id']})
      this.bookService.updateBook({book})
        .subscribe(data => this.router.navigate(['','browse']))
    }
  }

}
