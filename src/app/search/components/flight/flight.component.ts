import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup} from '@angular/forms/src/forms';
import { IFlight } from './flight.model';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html'
})
export class FlightComponent implements OnInit {

  public dataFlight: IFlight;
  constructor() {
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
  }

  submit(formFlight: NgForm) {
    console.log(formFlight);
  }
}
