import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CheckInService } from './check-in.service';
import { SelectorService } from '../../../shared/services/selector.service';
import { ICheckIn } from '../../models/check-in.model';
import { IStation } from '../../../shared/models/station.model';

@Component({
  selector: '[app-check-in]',
  templateUrl: './check-in.component.html',
  providers: [CheckInService, SelectorService]
})
export class CheckInComponent implements OnInit {
    public codeBook: string;
    public email: string;
    public isOrigin: boolean;


    @Output() selectedOrigin: EventEmitter<string> = new EventEmitter();

  constructor(public checkInService: CheckInService, public selectorService: SelectorService) {
    this.isOrigin = false;
   }

  ngOnInit() {
    this.selectorService.loadListStations(true);
    this.codeBook = this.checkInService.getCodeBooking('ABC123');
  }

  changeTypeChekIn(value) {
    this.isOrigin = value;
  }

  stationSelected(station: any) {
    this.selectedOrigin.emit(station);
  }

}
