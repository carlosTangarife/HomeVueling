import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { environment } from '../../../../environments/environment';

/*Local Services */
import { CalendarService } from '../../services/calendar.service';
import { SelectorService } from '../../../shared/services/selector.service';
import { CheckInService } from '../../services/check-in.service';
import { LinksHubService } from './../../../shared/services/links-hub.service';

/*Models using interface */
import { IStation } from '../../../shared/models/station.model';
import { ICheckIn } from '../../models/check-in.model';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: '[app-check-in]',
  templateUrl: './check-in.component.html',
  providers: [CheckInService, SelectorService]
})
export class CheckInComponent implements OnInit {
  @Output()
  selectedOrigin: EventEmitter<string> = new EventEmitter();
  public keyCookie: string;
  public validation: boolean;
  public flightTomorrow: Date;
  public dataCheckIn: ICheckIn;
  public isShowStation: boolean;
  public isFocusedStation: boolean;
  public checkInWithEmail: boolean;
  public isFocusedCalendar: boolean;
  public checkInWithOriginDestination: boolean;

  constructor(public checkInService: CheckInService, public selectorService: SelectorService, public calendarService: CalendarService, private _linksHubService: LinksHubService) {
    this.dataCheckIn = {};
    this.validation = false;
    this.isShowStation = false;
    this.checkInWithEmail = true;
    this.checkInWithOriginDestination = false;
    this.keyCookie = environment.keyCheckInCookie;
   }

  ngOnInit() {
    this.selectorService.loadStations();
    this.dataCheckIn.codeBooking = this.checkInService.getCodeBooking(this.keyCookie);
  }

  showEmail() {
    this.checkInWithEmail = true;
    this.checkInWithOriginDestination = false;
  }

  showOriginDestination() {
    this.checkInWithOriginDestination = true;
    this.checkInWithEmail = false;
  }

  showStation() {
    this.isShowStation = !this.isShowStation;
    this.isFocusedStation = this.isShowStation;
  }

  stationSelected(station: any) {
    this.dataCheckIn.originOrDestinationCode = station.code;
    this.dataCheckIn.originOrDestinationName = station.name;
    this.isFocusedStation = this.isShowStation;
  }

  showCalendar() {
    $('#vyCalendar').parent().removeClass('range-datepicker');
    this.calendarService.toggleShowDatePicker();
    this.isFocusedCalendar = this.calendarService.isShowDatePicker;
  }

  selectedDate(date: Date) {
    this.dataCheckIn.myFlightTomorrow = date;
    this.calendarService.toggleShowDatePicker();
    this.isFocusedCalendar = this.calendarService.isShowDatePicker;
  }

  myFlightTomorrow() {
    this.dataCheckIn.myFlightTomorrow = new Date();
    this.dataCheckIn.myFlightTomorrow.setDate(this.dataCheckIn.myFlightTomorrow.getDate() + 1);
    this.dataCheckIn.myFlightTomorrow.setHours(0, 0, 0, 0);
  }

  onSubmit(chekInform: NgForm) {
    if (chekInform.valid) {
      this.validation = false;
      this._linksHubService.linkCheckInOnline(this.checkInWithEmail, this.dataCheckIn);
    }else {
      this.validation = true;
    }
    console.log(this.dataCheckIn);
  }
}

