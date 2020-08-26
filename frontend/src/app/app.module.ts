import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShabatBookComponent } from './components/main-page/shabat-book/shabat-book.component';
import { HttpClientModule } from '@angular/common/http';
import { ShabatParashaComponent } from './components/main-page/shabat-parasha/shabat-parasha.component';
import { ShowAllBooksComponent } from './components/manage-books/show-all-books/show-all-books.component';
import { ShowBookComponent } from './components/manage-books/show-book/show-book.component';
import { HebDatePipe } from './pipes/hebDate.pipe';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ShabatBookComponent,
    ShabatParashaComponent,
    ShowAllBooksComponent,
    ShowBookComponent,
    HebDatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
