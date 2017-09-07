import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountListPassengerComponent } from './discount-list-passenger.component';

describe('DiscountListPassengerComponent', () => {
  let component: DiscountListPassengerComponent;
  let fixture: ComponentFixture<DiscountListPassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountListPassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountListPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
