import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IFlight } from '../../models/flight.model';
import { StationService } from '../../../shared/services/station.service';
import { environment } from '../../../../environments/environment';
import { DestinationSelectorComponent } from '../../../shared/components/destination-selector/destination-selector.component';

@Component({
  selector: '[app-flight]',
  templateUrl: './flight.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightComponent implements OnInit {
  @ViewChild('destination')
  destination: DestinationSelectorComponent;

  public dataFlight: IFlight;
  public isFocusedOrigin: boolean;
  public isFocusedDestination: boolean;
  public isFocusedPassengers: boolean;

  constructor(private _stationService: StationService) { }

  ngOnInit() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    this.dataFlight = {
      origin: {
        code: 'ALC',
        name: 'Alicante'
      },
      destination: {
        code: 'MAD',
        name: 'Madrid'
      },
      multi: {
        isActive: false,
        origin: {
          code: 'BCN',
          name: 'Barcelona'
        },
        destination: {
          code: 'LAX',
          name: 'Los Ángeles'
        },
        going: new Date(today.getTime())
      },
      passengers: {
        Adults : 1,
        Infants : 0,
        Children: 0,
        ExtraSeat: 0,
        TotalPassengers: 1
      },
      discount: {
        value: ''
      },
      going: new Date(today.getTime()),
      return: new Date(today.getTime())
    };
  }

  onSubmit() {
    this.saveSearch();
  }

  clickMulticity(multicity: boolean) {
    this.dataFlight.multi.isActive = multicity;
  }

  removeMulticity(multicity: boolean) {
    this.clickMulticity(multicity);
    if (this.destination.selectorService.viewPopup) {
      this.destination.showPopupDestination();
      this.destination.isFocused.emit(this.destination.selectorService.viewPopup);
    }
  }

  saveSearch() {
    this._stationService.saveStation(this.dataFlight.origin.code, environment.keyLastSearchOriginCookie, true);
    this._stationService.saveStation(this.dataFlight.destination.code, environment.keyLastSearchDestinationCookie, false);
  }
}
