import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShabatBookComponent } from './shabat-book.component';

describe('ShabatBookComponent', () => {
  let component: ShabatBookComponent;
  let fixture: ComponentFixture<ShabatBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShabatBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShabatBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
