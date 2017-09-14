import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PassengerService } from '../../services/passenger.service';
import { DiscountService } from '../../services/discount.service';
import { IPassengers } from '../../models/passenger.model';
import { IDiscount } from '../../models/discount.model';

@Component({
  selector: '[app-passenger]',
  templateUrl: './passenger.component.html',
  providers: [PassengerService, DiscountService]
})
export class PassengerComponent implements OnInit {
  @Input()
  public passengers: IPassengers;

  @Input()
  public discount: IDiscount;

  @Output()
  isFocused = new EventEmitter<boolean>();

  public isResident: boolean;
  public isLargeFamily: boolean;
  public isShowPassengers: boolean;
  public isShowDiscountList: boolean;

  constructor(public passengerService: PassengerService, public discountService: DiscountService) {
    this.isResident = false;
    this.isLargeFamily = false;
  }

  ngOnInit() {
    this.passengerService.validatePassenger(this.passengers);
    this.discountService.setDiscountList(this.isResident, this.isLargeFamily);
  }

  setResidentAndLargeFamily(data: any) {
    if (this.discountService.isDiscountEnabled()) {
      this.isResident = data.isResident;
      this.isLargeFamily = data.isLargeFamily;
      this.discountService.setDiscountList(this.isResident, this.isLargeFamily);
    }
  }

  togglePassengers() {
    this.isShowPassengers = !this.isShowPassengers
    this.isFocused.emit(this.isShowPassengers);
  }

  toggleDiscountList(discountSelected?: string) {
    this.isShowDiscountList = !this.isShowDiscountList;

    if (typeof discountSelected !== 'undefined') {
      this.discount.value = discountSelected;
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
