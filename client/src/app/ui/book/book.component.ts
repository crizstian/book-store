import {Component, Input, Output, EventEmitter} from '@angular/core'

@Component({
  selector: 'book',
  styleUrls: ['./book.component.css'],
  templateUrl: './book.component.html'
})
export class BookComponent {
  @Input() book
  @Output() action = new EventEmitter()
  hover: any = {}

  toggleEffect (value) {
    this.hover = value ? {
        'box-shadow': '0 1px 2px rgba(0, 0, 0, 0.2)',
        '-webkit-transition': 'box-shadow 0.2s',
        '-moz-transition': 'box-shadow 0.2s',
        'transition': 'box-shadow 0.2s'
    } : {}
  }

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
