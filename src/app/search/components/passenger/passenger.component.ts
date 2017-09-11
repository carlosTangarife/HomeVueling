import { PassengerService } from './passenger.service';
import { Component, OnInit, Input } from '@angular/core';
import { IMarket, IPassengers } from '../flight/flight.model';
import { IDiscountPassenger } from './passenger.model';

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
  public isShowDiscountList: boolean;
  public destinationSelected: IMarket;
  public discountPassengersSelected: boolean;
  public discountPassengers: IDiscountPassenger;

  constructor(public passengerService: PassengerService) {
    this.isResident = false;
    this.isLargeFamily = false;
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
