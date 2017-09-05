import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IStation } from '../../../search/components/flight/flight.model';
import { StationsSelectorService } from '../../services/stations-selector.service';

@Component({
  selector: 'app-stations',
  templateUrl: './station.component.html',
  providers: [StationsSelectorService]
})
export class StationsComponent implements OnInit {
  @ViewChild('stationInput') stationInput: ElementRef;
  @Input() typeStation: string;
  @Input() dataFlight: any;
  @Output() selectedOrigin: EventEmitter<string> = new EventEmitter();
  @Output() clickDestination: EventEmitter<any> = new EventEmitter();
  @Output() isFocused: EventEmitter<boolean> = new EventEmitter();

  public originCode: string;
  public isOrigin: boolean;

  constructor(private _stationsSelectorService: StationsSelectorService) { }

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
      this.selectedOrigin.emit(this.dataFlight.code);
      this.showPopupOrigin();
    } else {
      this.clickDestination.emit();
      this.showPopupDestination();
    }
    this.isFocused.emit(this._stationsSelectorService.viewPopup);
  }

  selectStation(station: any) {
    this.dataFlight.code = station.code;
    this.dataFlight.name = station.name;
    this.dataFlight.countryName = station.countryName;
    this.selectedOrigin.emit(station.code);
    this._stationsSelectorService.togglePopup();
  }

  deleteRecentStationsCookie(event) {
    this._stationsSelectorService.deleteStations(this.isOrigin);
    this.clearInput();
  }

  loadDestinations(iata: string) {
    this.originCode = iata;
    this.initSelector();
    this.showPopupDestination();
  }

  showPopupOrigin() {
    if (!this.dataFlight.code) {
      this.stationInput.nativeElement.focus();
      this._stationsSelectorService.togglePopup();
    }
    this.isFocused.emit(this._stationsSelectorService.viewPopup);
  }

  showPopupDestination() {
    if (this.originCode) {
      this.stationInput.nativeElement.focus();
      this._stationsSelectorService.togglePopup();
    } else {
      this.clearData();
      this._stationsSelectorService.hidePopup();
    }
    this.isFocused.emit(this._stationsSelectorService.viewPopup);
  }

  clearData() {
    this.dataFlight.code = '';
    this.dataFlight.name = '';
    this.dataFlight.countryName = '';
  }
}
