import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { environment } from '../../../../environments/environment';

/*Local Services */
import { CalendarService } from '../../services/calendar.service';
import { CheckInService } from '../../services/check-in.service';
import { SelectorService } from '../../../shared/services/selector.service';
import { LinksHubService } from './../../../shared/services/links-hub.service';

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
  @Output()
  selectedOrigin = new EventEmitter<string>();

  public keyCookie: string;
  public validation: boolean;
  public flightTomorrow: Date;
  public dataCheckIn: ICheckIn;
  public isFocusedStation: boolean;
  public checkInWithEmail: boolean;
  public isFocusedCalendar: boolean;
  public checkInWithOriginDestination: boolean;

  constructor(public checkInService: CheckInService, public selectorService: SelectorService, public calendarService: CalendarService, private _linksHubService: LinksHubService) {
    this.dataCheckIn = { date: null };
    this.validation = false;
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
    this.dataCheckIn.originOrDestinationName = '';
    this.selectorService.loadStations();
    this.selectorService.togglePopup();
    this.isFocusedStation = this.selectorService.viewPopup;
  }

  stationSelected(station: any) {
    this.dataCheckIn.originOrDestinationCode = station.code;
    this.dataCheckIn.originOrDestinationName = station.name;
    this.selectorService.hidePopup();
    this.isFocusedStation = this.selectorService.viewPopup;
  }

  showCalendar() {
    $('#vyCalendar').parent().removeClass('range-datepicker');
    this.calendarService.toggleShowDatePicker();
    this.isFocusedCalendar = this.calendarService.isShowDatePicker;
  }

  selectedDate(date: Date) {
    this.dataCheckIn.date = date;
    this.calendarService.toggleShowDatePicker();
    this.isFocusedCalendar = this.calendarService.isShowDatePicker;
  }

  myFlightTomorrow() {
    this.dataCheckIn.date = new Date();
    this.dataCheckIn.date.setDate(this.dataCheckIn.date.getDate() + 1);
    this.dataCheckIn.date.setHours(0, 0, 0, 0);
    this.calendarService.hideDatePicker();
    this.isFocusedCalendar = this.calendarService.isShowDatePicker;
  }

  onSubmit(chekInform: NgForm) {
    if (chekInform.valid) {
      this.validation = false;
      this._linksHubService.linkCheckInOnline(this.checkInWithEmail, this.dataCheckIn);
    } else {
      this.validation = true;
    }
  }

  filterStationsByKey(key: string) {
    this.selectorService.filterByKey(key);
    this.isFocusedStation = true;
  }
}
