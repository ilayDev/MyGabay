import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HebDateModel } from '../../../models/hebDates';
import { ToraBookService } from '../../../services/tora-book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  bookOwner: string;
  azcaraDates: HebDateModel[] = [];
  azcaraDates2: any[] = [];
  constructor(private toraBookService: ToraBookService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('submit');
    const newBook = {
      name: this.bookOwner,
      azcaraDates: [{}],
    };

    this.toraBookService
      .addToraBook(newBook)
      .subscribe((book) => console.log(book));
  }

  print() {
    console.log('bookOwner is:', this.bookOwner);
    console.log('azcaraDates are:', this.azcaraDates);
  }

  updateAzcaraDate(azcaraDate: HebDateModel, index: number) {
    console.log('updated:', azcaraDate);
    this.azcaraDates[index] = azcaraDate;
    console.log('update azcara in index:', index);
    console.log('azcaraDates is :', this.azcaraDates);
  }

  updateAzcaraDate2(azcaraDate: HebDateModel, index: number) {
    this.azcaraDates[index] = azcaraDate;
    console.log('update azcara in index:', index);
    console.log('azcaraDates is :', this.azcaraDates);
  }

  addAzcaraDate() {
    this.azcaraDates.push(undefined);
    this.azcaraDates2.push(undefined);
  }

  deleteDate(i: number) {
    console.log(this.azcaraDates);
    console.log(i);
    // this.azcaraDates = this.azcaraDates.slice(i, i + 1);
    this.azcaraDates.splice(i - 1, 1);

    // this.azcaraDates2 = this.azcaraDates2.slice(i, i + 1);
    this.azcaraDates2.splice(i, 1);
    console.log(this.azcaraDates);
  }
}
