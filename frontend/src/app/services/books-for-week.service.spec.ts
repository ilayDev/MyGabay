import { TestBed } from '@angular/core/testing';

import { BooksForWeekService } from './books-for-week.service';

describe('BooksForWeekService', () => {
  let service: BooksForWeekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksForWeekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
