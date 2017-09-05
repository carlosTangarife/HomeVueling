import { Component, OnInit, Input } from '@angular/core';
import { IStation } from '../../../search/components/flight/flight.model';
import { StationsSelectorService } from '../../services/stations-selector.service';

@Component({
  selector: 'app-stations',
  templateUrl: './station.component.html',
  providers: [StationsSelectorService],
  viewProviders: [StationsComponent]
})
export class StationsComponent implements OnInit {
  @Input() typeStation: string;
  @Input() dataFlight: any;
  @Input() dataOrigin: any;

  constructor(private _stationsSelectorService: StationsSelectorService) { }

  ngOnInit() {
    this.initStations();
  }

  initStations() {
    if (this.typeStation === 'origin') {
      this._stationsSelectorService.initStations();
    } else if (this.typeStation === 'destination') {
      this._stationsSelectorService.initDestinations(this.dataOrigin.code);
    }
  }

  clearInput() {
    this.dataFlight.code = '';
    this.dataFlight.name = '';
    this.dataFlight.countryName = '';
    this.initStations();
    this._stationsSelectorService.togglePopup();
  }

  selectStation(station: any) {
    this.dataFlight.code = station.code;
    this.dataFlight.name = station.name;
    this.dataFlight.countryName = station.countryName;
    this._stationsSelectorService.togglePopup();
  }

  deleteRecentStationsCookie(event) {
    this._stationsSelectorService.deleteStations(this.typeStation === 'origin');
    this.clearInput();
  }
}
