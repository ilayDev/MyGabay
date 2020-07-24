import { TestBed } from '@angular/core/testing';

import { ShabatBookService } from './shabat-book.service';

describe('ShabatBookService', () => {
  let service: ShabatBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShabatBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
