import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TYPE_DISCOUNT } from '../../../enums/type-discount.enum';

@Component({
  selector: '[app-discount-list]',
  templateUrl: './discount-list.component.html'
})
export class DiscountListComponent implements OnInit {
  @Input()
  typeDiscountList: string[];

  @Output()
  eventToggleDiscountList = new EventEmitter<string>();

  public discountSelected: string;

  constructor() {
    this.discountSelected = null;
  }

  ngOnInit() {
  }

  toggleDiscountList(discountKey: string) {
    if (this.discountSelected === discountKey
      || discountKey === TYPE_DISCOUNT[TYPE_DISCOUNT.noresfam]) {
      this.discountSelected = '';
    } else {
      this.discountSelected = discountKey
    }
    this.eventToggleDiscountList.emit(this.discountSelected);
  }
}
