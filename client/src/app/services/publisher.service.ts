import { Injectable } from '@angular/core';
import { StoreHelper } from './store-helper.service';
import { ApiService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class PublisherService {

  path: string = '/publisher'
  constructor(private storeHelper: StoreHelper, private apiService: ApiService) {}

  addPublisher (publisher) {
    return this.apiService.post(this.path, publisher)
    // .do(savedPublishers => this.storeHelper.add('publisher', savedPublishers))
  }

  getPublisher (publisher) {
    return this.apiService.get(`${this.path}/find`, publisher)
    // .do((res: any) => this.storeHelper.update('publisher', res.data));
  }

  deletePublisher (id) {
    return this.apiService.delete(`${this.path}/${id}`)
    // .do((res: any) => this.storeHelper.findAndDelete('publisher', res.id));
  }
}
