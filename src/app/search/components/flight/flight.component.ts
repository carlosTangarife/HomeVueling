import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  public dataFlight: IFlight;
  public isFocusedOrigin: boolean;
  public isFocusedDestination: boolean;

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
      }
    };
  }

  onSubmit() {
    this.saveSearch();
    // window.location.href = '/';
  }

  saveSearch() {
    this._stationService.saveStation(this.dataFlight.origin.code, environment.keyLastSearchOriginCookie, true);
    this._stationService.saveStation(this.dataFlight.destination.code, environment.keyLastSearchDestinationCookie, false);
  }
}
