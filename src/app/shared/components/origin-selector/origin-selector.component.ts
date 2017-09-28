import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { SelectorService } from '../../services/selector.service';
import { IStation } from '../../models/station.model';

@Component({
  selector: '[app-origin-selector]',
  templateUrl: './origin-selector.component.html',
  providers: [SelectorService]
})
export class OriginSelectorComponent implements OnInit {
  @ViewChild('originInput')
  originInput: ElementRef;

  @Input()
  dataFlight: IStation;

  @Output()
  selectedOrigin: EventEmitter<string> = new EventEmitter();

  @Output()
  isFocused: EventEmitter<boolean> = new EventEmitter();

  constructor(public selectorService: SelectorService) { }

  ngOnInit() {
    this.selectorService.loadListStations(true);
  }

  clearInput() {
    this.clearData();
    this.selectorService.loadListStations(true);
    this.selectedOrigin.emit();
    this.showPopupOrigin();
    this.isFocused.emit(this.selectorService.viewPopup);
  }

  selectStation(station: any) {
    this.dataFlight.code = station.code;
    this.dataFlight.name = station.name;
    this.dataFlight.countryName = station.countryName;
    this.selectedOrigin.emit();
    this.selectorService.togglePopup();
    this.isFocused.emit(this.selectorService.viewPopup);
  }

  deleteRecentStationsCookie(event) {
    this.selectorService.deleteStations(true);
    this.clearInput();
  }

  showPopupOrigin() {
    if (!this.dataFlight.code) {
      this.originInput.nativeElement.focus();
      this.selectorService.togglePopup();
      this.isFocused.emit(this.selectorService.viewPopup);
    }
  }

  clearData() {
    this.dataFlight.code = '';
    this.dataFlight.name = '';
    this.dataFlight.countryName = '';
  }

  filterStationsByKey(key: string) {
    this.selectorService.filterStationsByKey(key);
    this.isFocused.emit(this.selectorService.viewPopup);
  }
}
