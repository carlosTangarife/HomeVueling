import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: '[app-discount-list]',
  templateUrl: './discount-list.component.html'
})
export class DiscountListComponent implements OnInit {
  @Input()
  isResident: boolean;

  @Input()
  isLargeFamily: boolean;

  @Output()
  eventToggleDiscountList = new EventEmitter<any>();

  public discountActiveSelected: string;

  constructor() {
    this.isResident = false
    this.isLargeFamily = false
    this.discountActiveSelected = null;
  }

  ngOnInit() {
  }

  toggleDiscountList(discountPassengers: string) {
    let show: boolean;
    if (this.discountActiveSelected === discountPassengers) {
      this.discountActiveSelected = '';
      show = false;
    } else {
      this.discountActiveSelected = discountPassengers
      show = true;
    }
    this.eventToggleDiscountList.next({text: discountPassengers, show: show});
  }

}
