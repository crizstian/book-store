import {Component, Input, OnInit} from '@angular/core'
import { AuthService } from '../../services/auth.service'

declare var $:any

@Component({
    selector: 'app-bar',
    styles : [`
      a {
        font-family: "Roboto", sans-serif;
        font-size: 1.2em;
        text-decoration: none;
        display: inline-block;
        height: auto;
        line-height: 1;
        padding: 1em 1.4em;
        border-bottom: none;
        color: rgba(255, 255, 255, 0.9);
        border-radius: 0.25em;
      }

      a.active {
        font-weight: bold;
        box-shadow: none;
        background: #435779;
        color: #FFF;
      }

      .title-bar-title, .title-bar, .top-bar, .top-bar ul {
        background-color: #31353D;
      }

      .top-bar, .top-bar ul {
        height: 80px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
        z-index: 4;
      }

      .title-bar-title {
        color: rgba(255, 255, 255, 0.9);
        z-index: 5;
        font-size: 1.2em;
      }

      .menu-text {
          display: block;
      }

      @media screen and (max-width: 39.9375em) {
        .top-bar, .top-bar ul {
          height: auto;
          position: inherit;
        }
      }

    `],
    templateUrl: './app-bar.component.html'
})
export class AppBar implements OnInit {
  title:string = 'Book Store'
  isLoggedIn: boolean
  routes = []

  constructor(private auth: AuthService) {}

  ngOnInit () {
    this.isLoggedIn = this.auth.isAuthorized()
    console.log(this.isLoggedIn)
  }

  signout () {
    if (this.isLoggedIn) {
      this.auth.signout()
      this.isLoggedIn = this.auth.isAuthorized()
    }
  }

  onSelectedPage () {
    $('#example-menu').hide()
  }

}
