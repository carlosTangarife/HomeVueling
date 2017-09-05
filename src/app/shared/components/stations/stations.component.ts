import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IStation } from '../../../search/components/flight/flight.model';
import { StationsSelectorService } from '../../services/stations-selector.service';

@Component({
  selector: 'app-stations',
  templateUrl: './station.component.html',
  providers: [StationsSelectorService],
  viewProviders: [StationsComponent]
})
export class StationsComponent implements OnInit {
  @ViewChild('stationInput') stationInput: ElementRef;
  @Input() typeStation: string;
  @Input() dataFlight: any;
  @Output() selectedOrigin: EventEmitter<any> = new EventEmitter();
  @Output() clickDestination: EventEmitter<any> = new EventEmitter();

  public originCode: string;
  public isOrigin: boolean;

  constructor(private _stationsSelectorService: StationsSelectorService, private renderer: Renderer2) { }

  ngOnInit() {
    this.originCode = this.dataFlight.code;
    this.isOrigin = this.typeStation === 'origin';
    this.initSelector();
  }

  initSelector() {
    if (this.isOrigin) {
      this._stationsSelectorService.initStations();
    } else {
      this._stationsSelectorService.initDestinations(this.originCode);
    }
  }

  clearInput() {
    this.clearData();
    this.initSelector();
    if (this.isOrigin) {
      this.selectedOrigin.emit({code: this.dataFlight.code, element: this.stationInput});
      this.showPopupOrigin();
    } else {
      this.clickDestination.emit(this.stationInput);
      this.showPopupDestination();
    }
  }

  selectStation(station: any) {
    this.dataFlight.code = station.code;
    this.dataFlight.name = station.name;
    this.dataFlight.countryName = station.countryName;
    this.selectedOrigin.emit({code: station.code, element: this.stationInput});
    this._stationsSelectorService.togglePopup();
  }

  deleteRecentStationsCookie(event) {
    this._stationsSelectorService.deleteStations(this.typeStation === 'origin');
    this.clearInput();
  }

  loadDestinations(event: any) {
    this.originCode = event.code;
    this.initSelector();
    this.showPopupDestination();
  }

  showPopupOrigin(element?: any) {
    if (!this.dataFlight.code) {
      this._stationsSelectorService.togglePopup();
    }
  }

  showPopupDestination() {
    if (this.originCode) {
      this._stationsSelectorService.togglePopup();
    } else {
      this.clearData();
      this._stationsSelectorService.hidePopup();
    }
  }

  clearData() {
    this.dataFlight.code = '';
    this.dataFlight.name = '';
    this.dataFlight.countryName = '';
  }
}
