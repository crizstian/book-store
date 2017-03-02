import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import 'rxjs/Rx'

@Injectable()
export class BookService {

  path: string = '/bookstore'

  constructor(private apiService: ApiService) {}

  addBook (book) {
    return this.apiService.post(this.path, book)
  }

  updateBook (book) {
    return this.apiService.put(this.path, book)
  }

  getBook (book) {
    return this.apiService.get(`${this.path}/find`, book)
  }

  deleteBook (id) {
    return this.apiService.delete(`${this.path}/${id}`)
  }
}
