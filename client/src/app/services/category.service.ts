import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import 'rxjs/Rx'

@Injectable()
export class CategoryService {

  path: string = '/category'

  constructor(private apiService: ApiService) {}

  addCategory (category) {
    return this.apiService.post(this.path, category)
  }

  getCategory (category) {
    return this.apiService.get(`${this.path}/find`, category)
  }

  deleteCategory (id) {
    return this.apiService.delete(`${this.path}/${id}`)
  }
}
