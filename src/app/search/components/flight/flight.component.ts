import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IFlight } from 'app/search/components/flight/flight.model';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightComponent implements OnInit {

  public dataFlight: IFlight;
  public passengerFocused = false;

  @Output() stateOverlay = new EventEmitter<boolean>();

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
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
        adult: 1,
        children: 1,
        babies: 0,
        extraSeat: 0,
        totalPassengers: 1
      }
    };
  }

  clickPassenger() {
    this.passengerFocused = !this.passengerFocused;
    this.stateOverlay.emit();
  }
}
