import { Component, OnInit } from '@angular/core';
import { ToraBookService } from 'src/app/services/tora-book.service';
import { ToraBook } from 'src/app/models';

@Component({
  selector: 'app-show-all-books',
  templateUrl: './show-all-books.component.html',
  styleUrls: ['./show-all-books.component.css'],
})
export class ShowAllBooksComponent implements OnInit {
  toraBooks: ToraBook[];
  constructor(private bookService: ToraBookService) {}

  ngOnInit(): void {
    this.getToraBooks();
    console.log(this.toraBooks);
  }

  getToraBooks() {
    this.bookService
      .getAllToraBooks()
      .subscribe((books) => (this.toraBooks = books));
  }

  printToConsole() {
    console.log(this.toraBooks);
  }
}
