import {Component} from '@angular/core'
import {Router} from '@angular/router'

@Component({
  selector: 'edit-book',
  styleUrls: [],
  templateUrl: './edit-book.component.html'
})
export class EditBook {

  title: string = ''

  constructor(private router: Router) {
    const route: string = this.router.url
    if (route === '/add') {
        this.title = 'Add a new book to the catalog'
    } else {
      this.title = 'Edit existing book'
    }
  }

}
