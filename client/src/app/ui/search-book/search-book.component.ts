import {Component, Input, Output, EventEmitter} from '@angular/core'
import {AuthorService} from '../../services'

@Component({
  selector: 'search-book',
  styleUrls: ['./search-book.component.css'],
  templateUrl: './search-book.component.html'
})
export class SearchBookForm {
  @Input() headTitle
  @Output() searchObj = new EventEmitter()
  @Output() searchTitle = new EventEmitter()
  @Output() searchAuthor = new EventEmitter()
  @Output() searchPrice = new EventEmitter()

  authors = []

  constructor(private authorService: AuthorService) {
    this.authorService.getAuthor({authors: {}})
      .subscribe(data => this.authors = data)
  }

  setPriceObj (search): any {
    if ('price' in search) {
        const number = search['price']
        if (search['filter'] === 'lower') {
          return {price: {number, lower: true}}
        } else if (search['filter'] === 'higher'){
          return {price: {number, higher: true}}
        } else {
          return {price: number}
        }
    }
  }

  makeBookObj (values): any {
    const {search: filters} = values
    const book = {}

    for (let key in filters) {
        if (filters[key] !== '') {
            if (key == 'author') {
              book[key] = [filters[key]]
            } else {
              book[key] = filters[key]
            }
        }
    }

    if (filters['price'] !== '') {
        const price = this.setPriceObj(filters)
        delete book['filter']
        Object.assign(book, price)
    }

    return book
  }

  searchBook (search) {
    this.searchObj.next(this.makeBookObj(search))
  }

  searchByTitle (title) {
    this.searchTitle.next({title})
  }

  searchByAuthor (author) {
    this.searchAuthor.next({author})
  }

  searchByPrice (price) {
    this.searchPrice.next({price})
  }
}
