import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShabatBookComponent } from './components/main-page/shabat-book/shabat-book.component';
import { HttpClientModule } from '@angular/common/http';
import { ShabatParashaComponent } from './components/main-page/shabat-parasha/shabat-parasha.component';

@NgModule({
  declarations: [
    AppComponent,
    ShabatBookComponent,
    ShabatParashaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
