import { Component, OnInit, Input } from '@angular/core';
import { IMarket, IPassengers, IDataPassenger, ITypePassenger } from '../flight/flight.model';
import { IDiscountListPassengers, IDiscountPassenger, IInfoList } from './passenger.model';

@Component({
  selector: '[app-passenger]',
  templateUrl: './passenger.component.html'
})
export class PassengerComponent implements OnInit {
  @Input()
  public passengers: IPassengers;

  public isResident: boolean;
  public isLargeFamily: boolean;
  public isShowPassengers: boolean;
  public infoList: Array<IInfoList>;
  public isShowDiscountList: boolean;
  public destinationSelected: IMarket;
  public discountPassengersSelected: boolean;
  public discountPassengers: IDiscountPassenger;
  public typePassengerList: Array<ITypePassenger>;
  public discountListPassenger: IDiscountListPassengers;

  constructor() {
    this.isResident = false;
    this.isLargeFamily = false;
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
      {label: 'adults', rulAge: 'adultCaption', type: 'adults', data: { minus: true, plus: true, value: this.passengers.adults } },
      {label: 'children', rulAge: 'childrenCaption', type: 'children', data: { minus: false, plus: true, value: this.passengers.children } },
      {label: 'infants', rulAge: 'infantCaption', type: 'infants', data: { minus: false, plus: true, value: this.passengers.infants } },
      {label: 'extraseat', rulAge: 'plusMoreInfo', type: 'extraSeat', data: { minus: false, plus: true, value: this.passengers.extraSeat } }
    ]
  }

  setResidentAndLargeFamily(destination: IMarket) {
    this.isResident = destination.residents;
    this.isLargeFamily = destination.largefamily;
  }

  togglePassengers() {
    this.isShowPassengers = !this.isShowPassengers
  }

  toggleDiscountList(discountPassengers?: IDiscountPassenger) {
    this.isShowDiscountList = !this.isShowDiscountList;

    this.discountPassengers = discountPassengers;

    if (this.discountPassengers) {
      this.discountPassengersSelected = true;
    }
  }

  getLabelPassengers(): string {
    return this.passengers.totalPassengers === 1 ? 'passenger' : 'passengers';
  }

  changePassenger(event) {
    console.log(this.passengers)
  }
}
