import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IDiscountListPassengers, IDiscountPassenger } from '../passenger.model';

@Component({
  selector: '[app-discount-list-passenger]',
  templateUrl: './discount-list-passenger.component.html'
})
export class DiscountListPassengerComponent implements OnInit {

  public discountActiveSelected: any;

  @Output()
  eventToggleDiscountList = new EventEmitter<IDiscountPassenger>();

  @Input()
  discountListPassengers: IDiscountListPassengers;

  @Input()
  isResident: boolean;

  @Input()
  isLargeFamily: boolean;

  constructor() {
    this.isResident = false
    this.isLargeFamily = false
    this.discountActiveSelected = null;
  }

  ngOnInit() {
  }

  toggleDiscountList(discountPassengers: IDiscountPassenger) {
    this.discountActiveSelected = discountPassengers;
    this.eventToggleDiscountList.next(discountPassengers);
  }

}
