import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { StationsSelectorService } from 'app/search/components/flight/services/stations-selector.service';
import { IFlight, IStation } from 'app/search/components/flight/flight.model';

@Component({
  selector: 'app-origins-selector',
  templateUrl: './origins-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OriginsSelectorComponent implements OnInit {
  @Input() dataFlight: IFlight;

  constructor(private _stationsSelectorService: StationsSelectorService) { }

  ngOnInit() {
    this._stationsSelectorService.initStations();
  }

  clearInputOrigin() {
    this.dataFlight.origin.code = '';
    this.dataFlight.origin.name = '';
    this._stationsSelectorService.clearInputOrigin();
  }

  originSelected(originSelected: IStation) {
    this.dataFlight.origin.name = originSelected.name;
    this.dataFlight.origin.code = originSelected.code;
    this.dataFlight.origin.countryName = originSelected.countryName;
    this._stationsSelectorService.selectOrigin(this.dataFlight.origin.code);
  }
}
