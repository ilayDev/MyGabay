import { TestBed } from '@angular/core/testing';

import { ToraBookService } from './tora-book.service';

describe('ToraBookService', () => {
  let service: ToraBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToraBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
