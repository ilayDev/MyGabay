import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBooksContainerComponent } from './manage-books-container.component';

describe('ManageBooksContainerComponent', () => {
  let component: ManageBooksContainerComponent;
  let fixture: ComponentFixture<ManageBooksContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBooksContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBooksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
