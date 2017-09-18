import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInErrorComponent } from './check-in-error.component';

describe('CheckInErrorComponent', () => {
  let component: CheckInErrorComponent;
  let fixture: ComponentFixture<CheckInErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
