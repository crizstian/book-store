import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgUploaderModule } from 'ngx-uploader'

import { AppComponent } from './app.component';
import {
  AppBar,
  BookComponent,
  SearchBookForm
} from './ui'
import {
  Main,
  ShowBook,
  EditBook,
  Home,
  Login
} from './container'
import {FilterBookPipe} from './pipes'
import {
  BookService,
  AuthorService,
  CategoryService,
  PublisherService,
  ApiService,
  AuthService
} from './services'
import {routes} from './'

@NgModule({
  declarations: [
    AppComponent,
    Main,
    AppBar,
    ShowBook,
    BookComponent,
    EditBook,
    Home,
    SearchBookForm,
    FilterBookPipe,
    Login
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    NgUploaderModule
  ],
  providers: [
    BookService,
    AuthorService,
    CategoryService,
    PublisherService,
    ApiService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
