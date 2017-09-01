import { Component, OnInit, Input } from '@angular/core';
import { IPassenger } from '../../../search/components/flight/flight.model';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html'
})
export class PassengerComponent implements OnInit {
  @Input() passenger: IPassenger;
  constructor() { }

  ngOnInit() {
  }

  moreAdults() {
    if (this.passenger.adult < 16) {
      this.passenger.adult += 1;
      this.totalPassenger();
    }
  }

  lessAdults() {
    if (this.passenger.adult > 0) {
      this.passenger.adult -= 1;
      this.totalPassenger();
    }
  }

  moreBabies() {
    if (this.passenger.babies < 16) {
      this.passenger.babies += 1;
      this.totalPassenger();
    }
  }

  lessBabies() {
    if (this.passenger.babies > 0) {
      this.passenger.babies -= 1;
      this.totalPassenger();
    }
  }

  moreChildren() {
    if (this.passenger.children < 16) {
      this.passenger.children += 1;
      this.totalPassenger();
    }
  }

  lessChildren() {
    if (this.passenger.children > 0) {
      this.passenger.children -= 1;
      this.totalPassenger();
    }
  }

  moreExtraSeat() {
    if (this.passenger.extraSeat < 16) {
      this.passenger.extraSeat += 1;
      this.totalPassenger();
    }
  }

  lessExtraSeat() {
    if (this.passenger.extraSeat > 0) {
      this.passenger.extraSeat -= 1;
      this.totalPassenger();
    }
  }

  totalPassenger() {
    this.passenger.totalPassengers = this.passenger.adult + this.passenger.babies + this.passenger.children + this.passenger.extraSeat;
  }


}
