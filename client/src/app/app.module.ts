import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppBar, BookComponent, SearchBookForm} from './ui'
import {Main, ShowBook, EditBook, Home} from './container'
import {routes, providers} from './'

@NgModule({
  declarations: [
    AppComponent,
    Main,
    AppBar,
    ShowBook,
    BookComponent,
    EditBook,
    Home,
    SearchBookForm
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
