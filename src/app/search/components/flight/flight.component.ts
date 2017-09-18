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

  @Output()
  stateOverlay = new EventEmitter<void>();

  public dataFlight: IFlight;
  public isFocusedOrigin: boolean;
  public isFocusedDestination: boolean;
  public isFocusedPassengers: boolean;

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
      multi: {
        isActive: false,
        origin: {
          code: 'BCN',
          name: 'Barcelona'
        },
        destination: {
          code: 'LAX',
          name: 'Los Ángeles'
        }
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
      going: new Date(),
      return: new Date().getDate() + 7
    };
  }

  onSubmit() {
    this.saveSearch();
    console.log(this.dataFlight);
  }

  clickInput() {
    this.stateOverlay.emit();
  }

  clickMulticity(multicity: boolean) {
    this.dataFlight.multi.isActive = multicity;
  }

  removeMulticity(multicity: boolean) {
    this.clickMulticity(multicity);
    this.destination.showPopupDestination();
    this.destination.isFocused.emit(this.destination.selectorService.viewPopup);
  }

  saveSearch() {
    this._stationService.saveStation(this.dataFlight.origin.code, environment.keyLastSearchOriginCookie, true);
    this._stationService.saveStation(this.dataFlight.destination.code, environment.keyLastSearchDestinationCookie, false);
  }
}
