import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IFlight } from '../../../search/models/flight.model';
import { IMarket } from '../../models/station.model';
import { SelectorService } from '../../services/selector.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: '[app-destination-selector]',
  templateUrl: './destination-selector.component.html',
  providers: [SelectorService]
})
export class DestinationSelectorComponent implements OnInit {
  @ViewChild('destinationInput')
  destinationInput: ElementRef;

  @Input()
  dataFlight: IFlight;

  @Output()
  clickDestination: EventEmitter<any> = new EventEmitter();

  @Output()
  isFocused: EventEmitter<boolean> = new EventEmitter();

  @Output()
  outStation: EventEmitter<IMarket> = new EventEmitter();

  @Output()
  clickMulticity: EventEmitter<boolean> = new EventEmitter();

  public multicity: boolean;

  constructor(public selectorService: SelectorService) { }

  ngOnInit() {
    this.multicity = false;
    this.selectorService.getMarketsByIata(this.dataFlight.origin.code);
    this.selectorService.loadListStations(false);
    let destination = this.selectorService.getDestination(this.dataFlight.destination.code);
    destination ? this.outStation.emit(destination) : this.clearData();
  }

  clearInput() {
    this.clearData();
    this.selectorService.getMarketsByIata(this.dataFlight.origin.code);
    this.selectorService.loadListStations(false);
    this.clickDestination.emit();
    this.showPopupDestination();
    this.isFocused.emit(this.selectorService.viewPopup);
  }

  selectStation(station: any) {
    this.dataFlight.destination.code = station.code;
    this.dataFlight.destination.name = station.name;
    this.dataFlight.destination.countryName = station.countryName;
    this.selectorService.togglePopup();
    this.isFocused.emit(this.selectorService.viewPopup);
    this.outStation.emit(station);
  }

  deleteRecentStationsCookie(event) {
    this.selectorService.deleteStations(false);
    this.clearInput();
  }

  loadDestinations() {
    this.selectorService.getMarketsByIata(this.dataFlight.origin.code)
    this.selectorService.loadListStations(false);
    this.showPopupDestination();
    this.isFocused.emit(this.selectorService.viewPopup);
  }

  showPopupDestination() {
    if (this.dataFlight.origin.code) {
      this.destinationInput.nativeElement.focus();
      this.selectorService.togglePopup();
    } else {
      this.clearData();
      this.selectorService.hidePopup();
    }
  }

  clearData() {
    this.dataFlight.destination.code = '';
    this.dataFlight.destination.name = '';
    this.dataFlight.destination.countryName = '';
  }

  filterStationsByKey(key?: string) {
    this.selectorService.filterStationsByKey(false, key ? key : null);
    this.isFocused.emit(this.selectorService.viewPopup);
  }

  toogleMulticity() {
    this.multicity = !this.multicity;
    this.clickMulticity.emit(this.multicity);
  }
}
