import { Component, OnInit, Input } from '@angular/core';
import { IPassenger } from '../../../search/components/flight/flight.model';
import { IDataPassenger } from './type-passenger/type-passenger.model';
import { IDiscountPassengerList, IInfoList } from './passenger.model'

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html'
})
export class PassengerComponent implements OnInit {
  @Input() passenger: IPassenger;
  @Input() inputPassengerFocused: boolean;

  public stateListActive: boolean;

  public discountPassengerList: Array<IDiscountPassengerList>;
  public dataPassenger: IDataPassenger;
  public infoList: Array<IInfoList>;

  public disabledBaby: boolean;

  constructor() {
    this.stateListActive = false;
    this.discountPassengerList = [
        {data: 'Residente islas o Ceuta', discount: 50},
        {data: 'Fam. Numerosa General', discount: 5},
        {data: 'Fam. Numerosa Especial', discount: 10},
        {data: 'Fam. Numerosa General Residente', discount: 55},
        {data: 'Fam. Numerosa Especial Residente', discount: 60},
      ];

    this.infoList = [
        {title: 'Residentes', body: 'Durante la reserva se validará tu condición de residente'},
        {title: 'Familia numerosa', body: 'Se debe presentar la documentación acreditativa en el aeropuerto.'}
    ];
  }

  ngOnInit() {
  }

  totalPassenger() {
    this.passenger.totalPassengers = this.passenger.adult + this.passenger.babies + this.passenger.children + this.passenger.extraSeat;
    if (this.passenger.totalPassengers && this.passenger.totalPassengers > 25) {
      window.location.href = 'https://groupsnew.vueling.com/web';
    }
  }

  toggleClassListActive() {
    this.stateListActive = !this.stateListActive;
  }

  moreAndLessOperations(state: boolean, typePassenger: string) {
    if (state) {
      this.passenger[typePassenger] -= 1;
    }else {
      this.passenger[typePassenger] += 1;
    }
    this.totalPassenger();
  }

  validateAdult(state: boolean, typePassenger: string) {
    this.moreAndLessOperations(state, typePassenger);
    if (this.passenger.babies <= this.passenger.adult) {
      this.disabledBaby = true;
    }
  }

  validateBaby(state: boolean, typePassenger: string) {
    this.moreAndLessOperations(state, typePassenger);
  }
}
