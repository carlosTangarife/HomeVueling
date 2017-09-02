import { Component, OnInit, Input } from '@angular/core';
import { IPassenger } from '../../../search/components/flight/flight.model';
import { IDataPassenger } from './type-passenger/type-passenger.model';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html'
})
export class PassengerComponent implements OnInit {
  @Input() passenger: IPassenger;
  @Input() inputPassengerFocused: boolean;
  public stateListActive: boolean;
  constructor() {
    this.stateListActive = false;
  }

  ngOnInit() {
  }

  operatorPassengers(data: IDataPassenger) {
    if (data.more && this.passenger[data.typePassenger] < 16) {
      this.passenger[data.typePassenger] += 1;
    }else if (data.less && this.passenger[data.typePassenger] > 0) {
      this.passenger[data.typePassenger] -= 1;
    }
    this.totalPassenger();
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
}
