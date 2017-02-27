import {Component, Input} from '@angular/core'

@Component({
  selector: 'book',
  styleUrls: ['./book.component.css'],
  templateUrl: './book.component.html'
})
export class BookComponent {
  @Input() book
}
