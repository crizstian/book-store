import {Component, ViewChild, NgZone, Inject, EventEmitter } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader'
import {Router, ActivatedRoute} from '@angular/router'
import {BookService, AuthorService, CategoryService, PublisherService} from '../../services'
import { Observable } from 'rxjs/Observable'
import { FileUploader } from 'ng2-file-upload'
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
  image: any

  edit: boolean = false
  dateValidation: boolean = false

  authors = []
  publishers = []
  categories = []

  progressBar: any = { 'width': '0%'}
  progress: number = 0
  options: NgUploaderOptions
  response: any
  hasBaseDropZoneOver: boolean
  previewData: any
  private events: EventEmitter<any> = new EventEmitter()

  constructor(
    @Inject(NgZone) private zone: NgZone,
    private router: Router,
    private route:ActivatedRoute,
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private publisherService: PublisherService
  ) {
    const {url} = this.router
    this.setTitle(url)
    this.getDefaults()
    this.options = new NgUploaderOptions({
      url: 'http://api.ngx-uploader.com/upload',
      autoUpload: false,
      previewUrl: true
    })
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

 handleUpload(data: any) {
   setTimeout(() => {
     this.zone.run(() => {
       this.response = data
       this.progressBar = {'width': `${data.progress.percent}%`}
       this.progress = data.progress.percent
       if (data && data.response) {
         this.response = JSON.parse(data.response)
         if (this.progress === 100 && this.book.form.valid) {
           const book = Object.assign({}, this.book.form.value.book, {url: this.response[0].path})
           this.sendBook(book, this.edit)
         }
       }
     })
   })
 }

 fileOverBase(e: boolean) {
   this.hasBaseDropZoneOver = e;
 }

 startUpload() {
   this.events.emit('startUpload')
 }

 handlePreviewData(data: any) {
    this.previewData = data;
  }

  sendBook (book, edit) {
    console.log(book)
    if (!edit) {
      this.bookService.addBook({book})
        .subscribe(data => this.router.navigate(['','browse']))
    } else {
      const edited = Object.assign({}, book, {id: this.route.snapshot.params['id']})
      this.bookService.updateBook({book: edited})
        .subscribe(data => this.router.navigate(['','browse']))
    }
  }

}
