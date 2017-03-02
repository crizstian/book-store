import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import {Observable} from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import {CanActivate, Router} from '@angular/router'
import 'rxjs/Rx'

@Injectable()
export class AuthService implements CanActivate {
  JWT_KEY: string = 'bookstore_token'
  JWT: string = ''

  constructor(
     private api: ApiService,
     private router: Router
   ) {
    const token = window.localStorage.getItem(this.JWT_KEY)
    if (token) {
      this.setJwt(token)
    }
  }

  setJwt(jwt: string) {
    window.localStorage.setItem(this.JWT_KEY, jwt)
    this.api.setHeaders({Authorization: `Bearer ${jwt}`})
  }

  isAuthorized(): boolean {
    return Boolean(window.localStorage.getItem(this.JWT_KEY))
  }

  canActivate(): boolean {
    const canActivate = this.isAuthorized()
    this.onCanActivate(canActivate)
    return canActivate
  }

  onCanActivate(canActivate: boolean) {
    if (!canActivate) {
      this.router.navigate(['', 'login'])
    }
  }

  authenticate(path, creds): any {
    return this.api.post(`/${path}`, creds)
      .do((res: any) => this.setJwt(res.token))
      .map((res: any) => res.data)
  }

  signout() {
    window.localStorage.removeItem(this.JWT_KEY)
    this.router.navigate(['', 'login'])
  }
}
