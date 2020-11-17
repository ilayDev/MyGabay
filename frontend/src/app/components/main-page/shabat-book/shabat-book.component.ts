import { Component, OnInit } from '@angular/core';
import {ReadingBook} from '../../../models';
import {BooksForWeekService} from '../../../services/books-for-week.service';
// import { from } from 'rxjs';
@Component({
  selector: 'app-shabat-book',
  templateUrl: './shabat-book.component.html',
  styleUrls: ['./shabat-book.component.css']
})
export class ShabatBookComponent implements OnInit {
  shabatBooks: ReadingBook[];
  constructor(private shabatBookService: BooksForWeekService ) { }
  // constructor() { }

  ngOnInit(): void {
    this.getShabatBook();
  }

  getShabatBook(): void{
    this.shabatBookService.getBookForShabat().subscribe(books => this.shabatBooks = books);
  }
}
