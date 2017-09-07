import { Component, OnInit, Input } from '@angular/core';
import { IDataPassenger } from './type-passenger/type-passenger.model';
import { IDiscountListPassengers, IDiscountPassenger, IInfoList } from './passenger.model';
import { ITypePassengerList, IPassenger } from './type-passenger/type-passenger.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-passenger]',
  templateUrl: './passenger.component.html'
})
export class PassengerComponent implements OnInit {
  public passengers: IPassenger;
  public isResident: boolean;
  public isShowPassengers: boolean;
  public infoList: Array<IInfoList>;
  public isShowDiscountList: boolean;
  public discountPassengersSelected: boolean;
  public discountPassengers: IDiscountPassenger;
  public typePassengerList: Array<ITypePassengerList>;
  public discountListPassenger: IDiscountListPassengers;

  constructor() {
    this.isResident = false;
    this.discountListPassenger = {
      residentIslaCeuta: {
        data: 'Residente islas o Ceuta',
        discount: 50
      },
      famNumGeneral: {
        data: 'Fam. Numerosa General',
        discount: 5
      },
      famNumEspecial: {
        data: 'Fam. Numerosa Especial',
        discount: 10
      },
      famNumGeneralResident: {
        data: 'Fam. Numerosa General Residente',
        discount: 55
      },
      famNumEspecialResident: {
        data: 'Fam. Numerosa Especial Residente',
        discount: 60
      }
    };

    this.infoList = [
        {title: 'Residentes', body: 'Durante la reserva se validará tu condición de residente'},
        {title: 'Familia numerosa', body: 'Se debe presentar la documentación acreditativa en el aeropuerto.'}
    ];
 }

  ngOnInit() {
    this.typePassengerList = [
      {label: 'Adult', rulAge: 'Since 16 years', type: 'adult', iconLess: 'icon icon-rounded-less', iconMore: 'icon icon-rounded-more' },
      {label: 'Children', rulAge: '2 to 15 years', type: 'children', iconLess: 'icon icon-rounded-less', iconMore: 'icon icon-rounded-more' },
      {label: 'Baby', rulAge: 'From 7 days to 23 months', type: 'babies', iconLess: 'icon icon-rounded-less', iconMore: 'icon icon-rounded-more' },
      {label: 'ExtraSeat', rulAge: '+ info', type: 'extraSeat', iconLess: 'icon icon-rounded-less', iconMore: 'icon icon-rounded-more' }
    ]
  }

  togglePassengers() {
    this.isShowPassengers = !this.isShowPassengers
  }

  toggleDiscountList(discountPassengers?: IDiscountPassenger) {
    this.discountPassengers = discountPassengers;

    if (this.discountPassengers) {
      this.discountPassengersSelected = true;
    }

    console.log(discountPassengers)
    this.isShowDiscountList = !this.isShowDiscountList;
  }

  setPassenger(passenger: IPassenger) {
    this.passengers = passenger;
  }
}
