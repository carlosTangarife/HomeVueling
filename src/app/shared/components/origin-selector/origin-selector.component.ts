import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { SelectorService } from '../../services/selector.service';
import { IStation } from '../../models/station.model';

@Component({
  selector: '[app-origin-selector]',
  templateUrl: './origin-selector.component.html',
  providers: [SelectorService]
})
export class OriginSelectorComponent implements OnInit {
  @ViewChild('originInput') originInput: ElementRef;
  @Input() dataFlight: IStation;
  @Output() selectedOrigin: EventEmitter<string> = new EventEmitter();
  @Output() isFocused: EventEmitter<boolean> = new EventEmitter();

  constructor(public _selectorService: SelectorService) { }

  ngOnInit() {
    this._selectorService.loadListStations(true);
  }

  clearInput() {
    this.clearData();
    this._selectorService.loadListStations(true);
    this.selectedOrigin.emit();
    this.showPopupOrigin();
    this.isFocused.emit(this._selectorService.viewPopup);
  }

  selectStation(station: any) {    
    this.dataFlight.code = station.code;
    this.dataFlight.name = station.name;
    this.dataFlight.countryName = station.countryName;
    this.selectedOrigin.emit();
    this._selectorService.togglePopup();
    this.isFocused.emit(this._selectorService.viewPopup);
  }

  deleteRecentStationsCookie(event) {
    this._selectorService.deleteStations(true);
    this.clearInput();
  }

  showPopupOrigin() {
    if (!this.dataFlight.code) {
      this.originInput.nativeElement.focus();
      this._selectorService.togglePopup();
      this.isFocused.emit(this._selectorService.viewPopup);
    }
  }

  clearData() {
    this.dataFlight.code = '';
    this.dataFlight.name = '';
    this.dataFlight.countryName = '';
  }

  filterStationsByKey(key: string) {
    this._selectorService.filterStationsByKey(true, key);
    this.isFocused.emit(this._selectorService.viewPopup);
  }
}
