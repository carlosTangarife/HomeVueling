import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IFlight, IStationList } from 'app/search/components/flight/flight.model';
import { StationsSelectorService } from 'app/search/components/flight/services/stations-selector.service';
import { StationService } from 'app/shared/services/station.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  providers: [StationsSelectorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightComponent implements OnInit {
  public dataFlight: IFlight;
  public passengerFocused = false;

  @Output() stateOverlay = new EventEmitter<boolean>();

  constructor(private _stationService: StationService) { }

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

  onSubmit() {
    this.saveSearch();
    // window.location.href = '/';
  }

  clickPassenger() {
    this.passengerFocused = !this.passengerFocused;
    this.stateOverlay.emit();
  }

  saveSearch() {
    this._stationService.saveStationOrigin(this.dataFlight.origin.code);
    this._stationService.saveStationDestination(this.dataFlight.destination.code);
  }
}
