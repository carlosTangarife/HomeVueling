import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IDiscountListPassengers, IDiscountPassenger } from '../passenger.model';

@Component({
  selector: '[app-discount-list-passenger]',
  templateUrl: './discount-list-passenger.component.html'
})
export class DiscountListPassengerComponent implements OnInit {

  public discountActiveSelected: any;
  public discountListPassenger: IDiscountListPassengers;

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
    this.discountListPassenger = {
      residentIslaCeuta: 'Residente islas o Ceuta (50%)',
      famNumGeneral: 'Fam. Numerosa General (5%)',
      famNumEspecial: 'Fam. Numerosa Especial (10%)',
      famNumGeneralResident: 'Fam. Numerosa General Residente (55%)',
      famNumEspecialResident: 'Fam. Numerosa Especial Residente (60%)'
    };
  }

  ngOnInit() {
  }

  toggleDiscountList(discountPassengers: IDiscountPassenger) {
    this.discountActiveSelected = discountPassengers;
    this.eventToggleDiscountList.next(discountPassengers);
  }

}
