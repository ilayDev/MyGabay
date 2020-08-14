import { Component, OnInit, Input } from '@angular/core';
import { ToraBook } from 'src/app/models';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent implements OnInit {
  
  @Input() toraBook: ToraBook;
  
  constructor() { }

  ngOnInit(): void {
  }

}
