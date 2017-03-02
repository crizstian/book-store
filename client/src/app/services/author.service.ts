import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import 'rxjs/Rx'

@Injectable()
export class AuthorService {

  path: string = '/author'

  constructor(private apiService: ApiService) {}

  addAuthor (author) {
    return this.apiService.post(this.path, author)
  }

  getAuthor (author) {
    return this.apiService.get(`${this.path}/find`, author)
  }

  deleteAuthor (id) {
    return this.apiService.delete(`${this.path}/${id}`)
  }
}
