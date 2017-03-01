import { Injectable } from '@angular/core';
import { Book } from '../store';
import { StoreHelper } from './store-helper.service';
import { ApiService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class BookService {

  path: string = '/bookstore';
  constructor(private storeHelper: StoreHelper, private apiService: ApiService) {}

  addBook (book) {
    return this.apiService.post(this.path, book)
    // .do(savedBook => this.storeHelper.add('books', savedBook))
  }

  updateBook (book) {
    return this.apiService.put(this.path, book)
    // .do(savedBook => this.storeHelper.add('books', savedBook))
  }

  getBook (book) {
    return this.apiService.get(`${this.path}/find`, book)
    // .do((res: any) => this.storeHelper.update('book', res.data));
  }

  deleteBook (id) {
    return this.apiService.delete(`${this.path}/${id}`)
    // .do((res: any) => this.storeHelper.findAndDelete('books', res.id));
  }
}
