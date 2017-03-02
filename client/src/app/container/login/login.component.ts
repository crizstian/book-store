import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

declare var $:any

@Component({
  selector: 'auth-container',
  styles: [`
    .log-in-form {
      border: 1px solid #cacaca;
      margin: 20em;
      padding: 1em;
      border-radius: 3px;
    }

    input {
      border-bottom: 1px solid lightgrey;
    }
    .ng-invalid.ng-dirty {
      border-bottom: 1px solid red;
    }

    @media print, screen and (min-width: 40em) {
      .log-in-form {
        border: 1px solid #cacaca;
        margin: 10em 10em;
        padding: 1em;
        border-radius: 3px;
      }
    }

    @media screen and (max-width: 39.9375em) {
      .log-in-form {
        border: 1px solid #cacaca;
        margin: 2em;
        padding: 1em;
        border-radius: 3px;
      }
    }
  `],
  templateUrl: './login.component.html'
})
export class Login implements OnInit {

  user = {
    password: '',
    email: ''
  }

  mode: string = 'signin'
  linkText: string = 'Don\'t have an account?'

  constructor(private auth: AuthService, private router: Router) {}

  changeMode() {
    if (this.mode === 'signin') {
      this.mode = 'signup'
      this.linkText = 'Already have an account?'
    } else {
      this.mode = 'signin'
      this.linkText = 'Don\'t have an account?'
    }
  }

  ngOnInit() {
    $(document).foundation();
  }

  authenticate() {
    this.auth.authenticate(this.mode, {user: this.user})
      .subscribe(() => this.router.navigate(['']))
  }
}
