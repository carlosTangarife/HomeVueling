import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IDiscountListPassengers, IDiscountPassenger } from '../passenger.model';

@Component({
  selector: '[app-discount-list-passenger]',
  templateUrl: './discount-list-passenger.component.html'
})
export class DiscountListPassengerComponent implements OnInit {

  @Output()
  eventToggleDiscountList = new EventEmitter<IDiscountPassenger>();
  @Input()
  discountListPassengers: IDiscountListPassengers;

  constructor() { }

  ngOnInit() {
  }

  toggleDiscountList(discountPassengers: IDiscountPassenger) {
    this.eventToggleDiscountList.next(discountPassengers);
  }

}
