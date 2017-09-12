import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IFlight } from '../../../search/components/flight/flight.model';
import { StationService } from '../../../shared/services/station.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: '[app-flight]',
  templateUrl: './flight.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightComponent implements OnInit {

  @Output()
  stateOverlay = new EventEmitter<void>();

  public dataFlight: IFlight;
  public isFocusedOrigin: boolean;
  public isFocusedDestination: boolean;

  constructor(private _stationService: StationService) { }

  ngOnInit() {
    this.dataFlight = {
      origin: {
        code: 'ALC',
        name: 'Alicante'
      },
      destination: {
        code: 'MAD',
        name: 'Madrid'
      },
      passengers: {
        adults : 1,
        infants : 0,
        children: 0,
        extraSeat: 0,
        totalPassengers: 1
      }
    };
  }

  onSubmit() {
    this.saveSearch();
  }

  clickInput() {
    this.stateOverlay.next();
  }

  saveSearch() {
    this._stationService.saveStation(this.dataFlight.origin.code, environment.keyLastSearchOriginCookie, true);
    this._stationService.saveStation(this.dataFlight.destination.code, environment.keyLastSearchDestinationCookie, false);
  }
}
