import {Component, Input, Output, EventEmitter} from '@angular/core'

@Component({
  selector: 'book',
  styleUrls: ['./book.component.css'],
  templateUrl: './book.component.html'
})
export class BookComponent {
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
