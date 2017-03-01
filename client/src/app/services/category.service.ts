import { Injectable } from '@angular/core';
import { StoreHelper } from './store-helper.service';
import { ApiService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class CategoryService {

  path: string = '/category';
  constructor(private storeHelper: StoreHelper, private apiService: ApiService) {}

  addCategory (category) {
    return this.apiService.post(this.path, category)
    // .do(savedCategoryies => this.storeHelper.add('category', savedCategoryies))
  }

  getCategory (category) {
    return this.apiService.get(`${this.path}/find`, category)
    // .do((res: any) => this.storeHelper.update('category', res.data));
  }

  deleteCategory (id) {
    return this.apiService.delete(`${this.path}/${id}`)
    // .do((res: any) => this.storeHelper.findAndDelete('category', res.id));
  }
}
