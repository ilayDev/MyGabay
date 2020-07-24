import { Component, OnInit } from '@angular/core';
import {ToraBook } from '../../../models'
import { ShabatBookService } from '../../../services/shabat-book.service'
// import { from } from 'rxjs';
@Component({
  selector: 'app-shabat-book',
  templateUrl: './shabat-book.component.html',
  styleUrls: ['./shabat-book.component.css']
})
export class ShabatBookComponent implements OnInit {
  shabatBook: ToraBook;
  constructor(private shabatBookService:ShabatBookService ) { }
  // constructor() { }

  ngOnInit(): void {
    this.getShabatBook();
  }

  getShabatBook(): void{
    this.shabatBookService.getBookForShabat().subscribe(book=>this.shabatBook = book);
  }
}
