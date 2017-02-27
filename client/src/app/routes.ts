import { RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { Main, ShowBook, EditBook, Home } from './container'

export const routes: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    component: Main,
    children: [
      { path: '', component: Home },
      { path: 'browse', component: ShowBook },
      { path: 'add', component: EditBook },
    ]
  },
  { path: '**', redirectTo: '' }
])
