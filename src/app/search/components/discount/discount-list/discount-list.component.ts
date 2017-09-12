import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IDiscountListPassengers } from '../../../models/discount.model';

@Component({
  selector: '[app-discount-list]',
  templateUrl: './discount-list.component.html'
})
export class DiscountListComponent implements OnInit {

  public discountActiveSelected: string;
  public discountListPassenger: IDiscountListPassengers;

  @Output()
  eventToggleDiscountList = new EventEmitter<any>();

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
    let show: boolean;
    /**igual */
    if (this.discountActiveSelected === discountPassengers) {
      this.discountActiveSelected = '';
      show = false;
    /**Diferente */
    }else {
      this.discountActiveSelected = discountPassengers
      show = true;
    }
    this.eventToggleDiscountList.next({text: discountPassengers, show: show});
  }

}
