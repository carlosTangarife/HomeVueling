import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PassengerService } from '../../services/passenger.service';
import { IPassengers } from '../../models/passenger.model';
import { IMarket } from '../../../shared/models/station.model';

@Component({
  selector: '[app-passenger]',
  templateUrl: './passenger.component.html',
  providers: [PassengerService]
})
export class PassengerComponent implements OnInit {
  @Input()
  public passengers: IPassengers;

  @Output()
  isFocused: EventEmitter<boolean> = new EventEmitter();

  public isResident: boolean;
  public isLargeFamily: boolean;
  public isShowPassengers: boolean;
  public isShowDiscountList: boolean;
  public discountPassengersSelected: boolean;
  public discountPassengers: string;

  constructor(public passengerService: PassengerService) {
    this.isResident = false;
    this.isLargeFamily = false;
  }

  ngOnInit() {
    this.passengerService.validatePassenger(this.passengers);
  }

  setResidentAndLargeFamily(destination: IMarket) {
    if (this.passengerService.isDiscountEnabled()) {
      this.isResident = destination.residents;
      this.isLargeFamily = destination.largefamily;
    }
  }

  togglePassengers() {
    this.isShowPassengers = !this.isShowPassengers
    this.isFocused.emit(this.isShowPassengers);
  }

  toggleDiscountList(discountPassengers?: any) {
    this.isShowDiscountList = !this.isShowDiscountList;

    if (discountPassengers) {
      this.discountPassengers = discountPassengers.text;
      if (discountPassengers.show === true) {
        this.discountPassengersSelected = true;
      } else {
        this.discountPassengersSelected = false;
      }
    }
  }

  getLabelPassengers(): string {
    return this.passengers.TotalPassengers === 1 ? 'passenger' : 'passengers';
  }

  getLabelAdults(): string {
    return this.passengers.Adults === 1 ? 'adult' : 'adults';
  }

  getLabelChildren(): string {
    return this.passengers.Children === 1 ? 'child' : 'children';
  }

  getLabelInfants(): string {
    return this.passengers.Infants === 1 ? 'infant' : 'infants';
  }

  changePassenger(event) {
    this.passengerService.validatePassenger(this.passengers);
  }
}
