import {Component, Output, EventEmitter} from '@angular/core'

@Component({
  selector: 'search-book',
  styleUrls: ['./search-book.component.css'],
  templateUrl: './search-book.component.html'
})
export class SearchBookForm {
  @Output() searchObj = new EventEmitter()

  search = {
    title: '',
    author: '',
    price: ''
  }

  range = {}

  setPriceObj (): any {
    if (typeof this.search.price === 'number') {
        const number = this.search.price
        if (this.range['filter'] === 'lower') {
          return {price: {number, lower: true}}
        } else if (this.range['filter'] === 'higher'){
          return {price: {number, higher: true}}
        } else {
          return {price: number}
        }
    }
  }

  makeBookObj (): any {
    const price = this.setPriceObj()
    const book = {}

    for (let key in this.search) {
        if (this.search[key] !== '') {
            book[key] = this.search[key]
        }
    }

    return Object.assign(book, price)

  }

  searchBook () {
    const book = this.makeBookObj()
    this.searchObj.next({book})
  }

}
