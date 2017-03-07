import { Component} from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
    <app-bar></app-bar>
    
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
