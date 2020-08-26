import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowAllBooksComponent } from './components/manage-books/show-all-books/show-all-books.component';
import { MainContainerComponent } from './components/main-page/main-container/main-container.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainContainerComponent },
  { path: 'books', component: ShowAllBooksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }