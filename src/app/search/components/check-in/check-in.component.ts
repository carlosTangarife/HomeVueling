import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../../../environments/environment';

/*Local Services */
import { CalendarService } from '../../../shared/services/calendar.service';
import { SelectorService } from '../../../shared/services/selector.service';
import { CheckInService } from './check-in.service';

/*Models using interface */
import { IStation } from '../../../shared/models/station.model';
import { ICheckIn } from '../../models/check-in.model';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: '[app-check-in]',
  templateUrl: './check-in.component.html',
  providers: [CheckInService, SelectorService]
})
export class CheckInComponent implements OnInit {
    public codeBook: string;
    public email: string;
    public submit: boolean;
    public keyCookie: string;
    public isOrigin: boolean;
    public isChecked: boolean;
    public isShowStation: boolean;
    public station: IStation;
    public flightTomorrow: Date;
    public isChekIn: boolean;

  @Output() selectedOrigin: EventEmitter<string> = new EventEmitter();

  constructor(public checkInService: CheckInService, public selectorService: SelectorService, public calendarService: CalendarService) {
    this.isOrigin = false;
    this.isShowStation = false;
    this.isChecked = true;
    this.submit = true;
    this.keyCookie = environment.keyCheckInCookie;
    this.isChekIn = false;
    this.flightTomorrow = null;
   }

  ngOnInit() {
    this.selectorService.loadStations();
    this.codeBook = this.checkInService.getCodeBooking(this.keyCookie);
  }

  changeTypeCheckIn(value) {
    this.isOrigin = value;
  }

  toggleChecked() {
    this.isChecked = !this.isChecked;
  }

  showStation(station: any) {
    this.isShowStation = !this.isShowStation;
  }

  stationSelected(station: any) {
    this.station = station.name;
  }

  onSubmit() {
    this.submit = !this.submit;
  }
}
