import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/forms';
import { IFlight } from './flight.model';
import { DestinationsService } from '../../../shared/services/destinations.service'

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',

})
export class FlightComponent implements OnInit {

  public dataFlight: IFlight;
  public origin$: any;
  public stationsResent$: any;
  constructor( public _ds: DestinationsService) {
    this.dataFlight = {
      origin: {
        code: 'BCN',
        name: 'Barcelona'
      },
      destination: {
        code: 'MAD',
        name: 'Madrid'
      },
      going: new Date(),
      return: new Date(17, 8, 15),
      passenger: {
        adult: 3,
        children: 3,
        babies: 0,
        extraSeat: 0,
        totalPassengers: 6
      }
    }
  }

  ngOnInit() {
    this.origin$ = this._ds.getStationsOrigin();
    this.stationsResent$ = this._ds.getRecentSearch();
  }

  submit(formFlight: NgForm) {
    console.log(formFlight);
  }

  moreAdults() {
    if (this.dataFlight.passenger.adult < 16) {
      this.dataFlight.passenger.adult += 1;
      this.totalPassenger();
    }
  }

  lessAdults() {
    if (this.dataFlight.passenger.adult > 0) {
      this.dataFlight.passenger.adult -= 1;
      this.totalPassenger();
    }
  }

  moreBabies() {
    if (this.dataFlight.passenger.babies < 16) {
      this.dataFlight.passenger.babies += 1;
      this.totalPassenger();
    }
  }

  lessBabies() {
    if (this.dataFlight.passenger.babies > 0) {
      this.dataFlight.passenger.babies -= 1;
      this.totalPassenger();
    }
  }

  moreChildren() {
    if (this.dataFlight.passenger.children < 16) {
      this.dataFlight.passenger.children += 1;
      this.totalPassenger();
    }
  }

  lessChildren() {
    if (this.dataFlight.passenger.children > 0) {
      this.dataFlight.passenger.children -= 1;
      this.totalPassenger();
    }
  }

  moreExtraSeat() {
    if (this.dataFlight.passenger.extraSeat < 16) {
      this.dataFlight.passenger.extraSeat += 1;
      this.totalPassenger();
    }
  }

  lessExtraSeat() {
    if (this.dataFlight.passenger.extraSeat > 0) {
      this.dataFlight.passenger.extraSeat -= 1;
      this.totalPassenger();
    }
  }

  totalPassenger() {
    // tslint:disable-next-line:max-line-length
    this.dataFlight.passenger.totalPassengers = this.dataFlight.passenger.adult + this.dataFlight.passenger.babies + this.dataFlight.passenger.children + this.dataFlight.passenger.extraSeat;
  }

  clearInputDestination() {
    this.dataFlight.destination.code = '';
    this.dataFlight.destination.name = '';
  }

  clearInputOrigin() {
    this.dataFlight.origin.code = '';
    this.dataFlight.origin.name = '';
  }

}
