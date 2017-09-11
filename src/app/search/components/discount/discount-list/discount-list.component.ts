import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IDiscountListPassengers, IDiscountPassenger } from '../../passenger/passenger.model';

@Component({
  selector: '[app-discount-list]',
  templateUrl: './discount-list.component.html'
})
export class DiscountListComponent implements OnInit {

  public discountActiveSelected: string;
  public discountListPassenger: IDiscountListPassengers;

  @Output()
  eventToggleDiscountList = new EventEmitter<string>();

  @Input()
  discountListPassengers: string;

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

  toggleDiscountList(discountPassengers: string) {
    this.discountActiveSelected = discountPassengers;
    this.eventToggleDiscountList.next(discountPassengers);
  }

}
