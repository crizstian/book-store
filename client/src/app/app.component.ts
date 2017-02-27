import { Component} from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
