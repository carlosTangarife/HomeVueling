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

  @ViewChild('multicityBtn')
  multicityBtn: ElementRef;

  @Input()
  dataFlight: any;

  @Output()
  clickDestination: EventEmitter<any> = new EventEmitter();

  @Output()
  isFocused: EventEmitter<boolean> = new EventEmitter();

  @Output()
  outStation: EventEmitter<any> = new EventEmitter();

  @Output()
  clickMulticity: EventEmitter<boolean> = new EventEmitter();

  constructor(public selectorService: SelectorService) { }

  ngOnInit() {
    this.selectorService.getMarketsByIata(this.dataFlight.origin.code);
    this.selectorService.loadListStations(false);
    let data = this.selectorService.isResidentsFamily(this.dataFlight.destination.code);
    this.outStation.emit(data);
  }

  clearInput() {
    this.clearData();
    this.selectorService.getMarketsByIata(this.dataFlight.origin.code);
    this.selectorService.loadListStations(false);
    this.clickDestination.emit();
    this.showPopupDestination();
    this.isFocused.emit(this.selectorService.viewPopup);
    let data = this.selectorService.isResidentsFamily(this.dataFlight.destination.code);
    this.outStation.emit(data);
    if (this.dataFlight.multi) {
      if (this.dataFlight.multi.isActive !== this.multicityBtn.nativeElement.checked) {
        this.multicityBtn.nativeElement.click();
      }
    }
  }

  selectStation(station: any) {
    this.dataFlight.destination.code = station.code;
    this.dataFlight.destination.name = station.name;
    this.dataFlight.destination.countryName = station.countryName;
    this.selectorService.togglePopup();
    this.isFocused.emit(this.selectorService.viewPopup);
    let data = this.selectorService.isResidentsFamily(this.dataFlight.destination.code);
    this.outStation.emit(data);
    debugger;
    this.selectorService.getFlightDisabledDays(this.dataFlight);
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
    let data = this.selectorService.isResidentsFamily(this.dataFlight.destination.code);
    this.outStation.emit(data);
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
    this.showPopupDestination();
    this.isFocused.emit(this.selectorService.viewPopup);
    this.clickMulticity.emit(!this.multicityBtn.nativeElement.checked);
  }
}
