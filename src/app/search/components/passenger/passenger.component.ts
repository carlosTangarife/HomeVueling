import { PassengerService } from './passenger.service';
import { Component, OnInit, Input } from '@angular/core';
import { IMarket, IPassengers, IDataPassenger, ITypePassenger } from '../flight/flight.model';
import { IDiscountListPassengers, IDiscountPassenger, IInfoList } from './passenger.model';

@Component({
  selector: '[app-passenger]',
  templateUrl: './passenger.component.html',
  providers: [PassengerService]
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

  constructor(public passengerService: PassengerService) {
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
 }

  ngOnInit() {
    this.passengerService.validatePassenger(this.passengers);
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
    this.passengerService.validatePassenger(this.passengers);
    console.log(this.passengers);
  }
}
