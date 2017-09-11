import { Component, OnInit, Input } from '@angular/core';
import { IDiscountPassenger } from '../passenger/passenger.model';

@Component({
  selector: '[app-discount]',
  templateUrl: './discount.component.html'
})
export class DiscountComponent implements OnInit {

  @Input()
  typeDiscountSelected: IDiscountPassenger;

  @Input()
  selected: boolean;

  @Input()
  isResident: boolean;

  @Input()
  isLargeFamily: boolean;

  constructor() {
    this.selected = false;
    this.isResident = false;
    this.isLargeFamily = false;
  }

  ngOnInit() {
  }

}
