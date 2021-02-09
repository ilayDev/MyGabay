import { Component, OnInit } from '@angular/core';
import { Days, Months } from '../../../models/hebDates';
import { ToraBookService } from '../../../services/tora-book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  bookOwner;
  months = Months.slice(1);
  days = Days.slice(1);
  selectedYear: string;
  selectedMonth: string;
  selectedDay: string;
  selectedDay1 = 'בחר יום';
  constructor(private toraBookService: ToraBookService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('submit');
    const newBook = {
      name: this.bookOwner,
      azcaraDates: [
        {
          month: this.selectedMonth,
          day: this.selectedDay,
          year: this.selectedYear,
        },
      ],
    };

    this.toraBookService
      .addToraBook(newBook)
      .subscribe((book) => console.log(book));
  }

  print() {
    console.log(this.selectedDay);
    console.log(this.selectedMonth);
    console.log(this.selectedYear);
    console.log(this.bookOwner);
  }
}
