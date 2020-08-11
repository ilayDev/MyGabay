import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShabatParashaComponent } from './shabat-parasha.component';

describe('ShabatParashaComponent', () => {
  let component: ShabatParashaComponent;
  let fixture: ComponentFixture<ShabatParashaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShabatParashaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShabatParashaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
