import { RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { AuthService } from './services'
import { Main, ShowBook, EditBook, Home, Login } from './container'

export const routes: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    component: Main,
    canActivate: [AuthService],
    children: [
      { path: '', component: Home },
      { path: 'browse', component: ShowBook },
      { path: 'add', component: EditBook },
      { path: 'edit/:id', component: EditBook },
    ]
  },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' }
])
