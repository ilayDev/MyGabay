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
import { MainContainerComponent } from './components/main-page/main-container/main-container.component';
import { AddBookComponent } from './components/manage-books/add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageBooksContainerComponent } from './components/manage-books/manage-books-container/manage-books-container.component';

@NgModule({
  declarations: [
    AppComponent,
    ShabatBookComponent,
    ShabatParashaComponent,
    ShowAllBooksComponent,
    ShowBookComponent,
    HebDatePipe,
    MainContainerComponent,
    AddBookComponent,
    ManageBooksContainerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
