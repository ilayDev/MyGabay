import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Days, HebDateModel, Months } from '../../models/hebDates';

@Component({
  selector: 'app-hebrew-date-input',
  templateUrl: './hebrew-date-input.component.html',
  styleUrls: ['./hebrew-date-input.component.css'],
})
export class HebrewDateInputComponent implements OnInit {
  months = Months;
  days = Days;
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;
  azcaraDate: HebDateModel;
  @Output() newAzcaraDateEvent = new EventEmitter<HebDateModel>();
  // @Input() azcaraDate; //: HebDateModel;
  @Output() delete = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  onChange() {
    const azcaraDate: HebDateModel = {
      day: this.selectedDay,
      month: this.selectedMonth,
      year: this.selectedYear,
    };

    if (this.validate(azcaraDate)) {
      this.newAzcaraDateEvent.emit(azcaraDate);
      // this.azcaraDate = { val: azcaraDate }; // azcaraDate;
      this.azcaraDate = azcaraDate;

      console.log(this.azcaraDate);
    }
    // console.log(azcaraDate);
    // console.log(this.newAzcaraDateEvent);
  }

  validate(azcaraDate: HebDateModel) {
    if (
      azcaraDate.day === undefined ||
      azcaraDate.month === undefined ||
      azcaraDate.year === undefined
    ) {
      return false;
    }
    // add heb date validation
    return true;
  }

  deleteDate() {
    this.delete.emit();
  }
}
