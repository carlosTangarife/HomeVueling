import { Component, OnInit, Input } from '@angular/core';
import { IDiscountPassenger } from '../passenger.model';

@Component({
  selector: 'app-discount-passenger',
  templateUrl: './discount-passenger.component.html'
})
export class DiscountPassengerComponent implements OnInit {

  @Input()
  typeDiscountSelected: IDiscountPassenger;

  @Input()
  selected: boolean;

  constructor() { }

  ngOnInit() {
  }

}
