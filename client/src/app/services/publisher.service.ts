import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import 'rxjs/Rx'

@Injectable()
export class PublisherService {

  path: string = '/publisher'

  constructor(private apiService: ApiService) {}

  addPublisher (publisher) {
    return this.apiService.post(this.path, publisher)
  }

  getPublisher (publisher) {
    return this.apiService.get(`${this.path}/find`, publisher)
  }

  deletePublisher (id) {
    return this.apiService.delete(`${this.path}/${id}`)
  }
}
