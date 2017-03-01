import { Injectable } from '@angular/core';
import { StoreHelper } from './store-helper.service';
import { ApiService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class AuthorService {

  path: string = '/author';
  constructor(private storeHelper: StoreHelper, private apiService: ApiService) {}

  addAuthor (author) {
    return this.apiService.post(this.path, author)
    // .do(savedAuthors => this.storeHelper.add('authors', savedAuthors))
  }

  getAuthor (author) {
    return this.apiService.get(`${this.path}/find`, author)
    // .do((res: any) => this.storeHelper.update('authors', res.data));
  }

  deleteAuthor (id) {
    return this.apiService.delete(`${this.path}/${id}`)
    // .do((res: any) => this.storeHelper.findAndDelete('authors', res.id));
  }
}
