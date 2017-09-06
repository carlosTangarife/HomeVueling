import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IFlight } from '../../../search/components/flight/flight.model';
import { SelectorService } from '../../services/selector.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-destination-selector',
  templateUrl: './destination-selector.component.html',
  providers: [SelectorService]
})
export class DestinationSelectorComponent implements OnInit {
  @ViewChild('destinationInput') destinationInput: ElementRef;
  @Input() dataFlight: IFlight;
  @Output() clickDestination: EventEmitter<any> = new EventEmitter();
  @Output() isFocused: EventEmitter<boolean> = new EventEmitter();

  constructor(private _selectorService: SelectorService) { }

  ngOnInit() {
    this._selectorService.getMarketsByIata(this.dataFlight.origin.code);
    this._selectorService.loadListStations(false);
  }

  clearInput() {
    this.clearData();
    this._selectorService.getMarketsByIata(this.dataFlight.origin.code);
    this._selectorService.loadListStations(false);
    this.clickDestination.emit();
    this.showPopupDestination();
    this.isFocused.emit(this._selectorService.viewPopup);
  }

  selectStation(station: any) {
    this.dataFlight.destination.code = station.code;
    this.dataFlight.destination.name = station.name;
    this.dataFlight.destination.countryName = station.countryName;
    this._selectorService.togglePopup();
    this.isFocused.emit(this._selectorService.viewPopup);
  }

  deleteRecentStationsCookie(event) {
    this._selectorService.deleteStations(false);
    this.clearInput();
  }

  loadDestinations() {
    this._selectorService.getMarketsByIata(this.dataFlight.origin.code)
    this._selectorService.loadListStations(false);
    this.showPopupDestination();
    this.isFocused.emit(this._selectorService.viewPopup);
  }

  showPopupDestination() {
    if (this.dataFlight.origin.code) {
      this.destinationInput.nativeElement.focus();
      this._selectorService.togglePopup();
    } else {
      this.clearData();
      this._selectorService.hidePopup();
    }
  }

  clearData() {
    this.dataFlight.destination.code = '';
    this.dataFlight.destination.name = '';
    this.dataFlight.destination.countryName = '';
  }

  filterStationsByKey(key?: string) {
    this._selectorService.filterStationsByKey(false, key ? key : null);
    this.isFocused.emit(this._selectorService.viewPopup);
  }
}
