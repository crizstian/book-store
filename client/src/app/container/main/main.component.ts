import { Component, OnInit } from '@angular/core';

declare const $:any

@Component({
  selector: 'main-container',
  styles: [`
    .main {
      margin-top: 5em;
      font-family: "PT Sans", sans-serif;
      color: #2f2933;
      background-color: #eaeaea;
    }

    @media screen and (max-width: 39.9375em) {
      .main {
        margin-top: 0em;
      }
    }
    `],
  template: `
    <div class="main-container">
    <app-bar></app-bar>
      <main class="main product-intro">
         <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class Main implements OnInit{

  ngOnInit() {
    $(document).foundation();
  }
}
