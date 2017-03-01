import {Component, Output, EventEmitter} from '@angular/core'

@Component({
  selector: 'search-book',
  styleUrls: ['./search-book.component.css'],
  templateUrl: './search-book.component.html'
})
export class SearchBookForm {
  @Output() searchObj = new EventEmitter()
  @Output() searchTitle = new EventEmitter()
  @Output() searchAuthor = new EventEmitter()
  @Output() searchPrice = new EventEmitter()

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
            book[key] = filters[key]
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
