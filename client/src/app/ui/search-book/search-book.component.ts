import {Component, Input, Output, EventEmitter} from '@angular/core'

@Component({
  selector: 'search-book',
  styleUrls: ['./search-book.component.css'],
  templateUrl: './search-book.component.html'
})
export class SearchBookForm {
  @Input() book
  @Output() action = new EventEmitter()

  viewBook(id: string) {
    this.action.next({id, action: 'view'})
  }

  editBook(id: string) {
    this.action.next({id, action: 'edit'})
  }

  deleteBook(id: string) {
    this.action.next({id, action: 'delete'})
  }

}
