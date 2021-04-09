import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HebrewDateInputComponent } from './hebrew-date-input.component';

describe('HebrewDateInputComponent', () => {
  let component: HebrewDateInputComponent;
  let fixture: ComponentFixture<HebrewDateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HebrewDateInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HebrewDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
