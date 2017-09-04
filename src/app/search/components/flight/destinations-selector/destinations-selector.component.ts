import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { StationsSelectorService } from 'app/search/components/flight/services/stations-selector.service';
import { IFlight, IStation } from 'app/search/components/flight/flight.model';

@Component({
  selector: 'app-destinations-selector',
  templateUrl: './destinations-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinationsSelectorComponent implements OnInit {
  @Input() dataFlight: IFlight;

  constructor(protected _stationsSelectorService: StationsSelectorService) { }

  ngOnInit() {
    this._stationsSelectorService.initDestinations(this.dataFlight.origin.code);
  }

  clearInputDestination(el?) {
    this.dataFlight.destination.code = '';
    this.dataFlight.destination.name = '';
    this._stationsSelectorService.clearInputDestination(el);
  }

  originSelected(originSelected: IStation) {
    this.dataFlight.origin.name = originSelected.name;
    this.dataFlight.origin.code = originSelected.code;
    this.dataFlight.origin.countryName = originSelected.countryName;
    this._stationsSelectorService.selectOrigin(this.dataFlight.origin.code);
  }

  destinationSelected(destinationSelected: IStation) {
    this.dataFlight.destination.name = destinationSelected.name;
    this.dataFlight.destination.code = destinationSelected.code;
    this.dataFlight.destination.countryName = destinationSelected.countryName;
    this._stationsSelectorService.selectDestination();
  }
}
