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
import { IReservation } from '../../models/reservation';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: '[app-reservation]',
  templateUrl: './reservation.component.html',
  providers: [CheckInService, SelectorService]
})
export class ReservationComponent implements OnInit {
  @Output()
  selectedOrigin = new EventEmitter<string>();

  public keyCookie: string;
  public validation: boolean;
  public isFocusedStation: boolean;
  public isFocusedCalendar: boolean;
  public reservationWithEmail: boolean;
  public dataReservation: IReservation;
  public reservationWithOriginDestination: boolean;

  constructor(public checkInService: CheckInService, public selectorService: SelectorService, public calendarService: CalendarService, private _linksHubService: LinksHubService) {
    this.validation = false;
    this.dataReservation = { date: null };
    this.reservationWithEmail = true;
    this.reservationWithOriginDestination = false;
    this.keyCookie = environment.keyCheckInCookie;
  }

  ngOnInit() {
    this.selectorService.loadStations();
    this.dataReservation.codeBooking = this.checkInService.getCodeBooking(this.keyCookie);
  }

  showEmail() {
    this.reservationWithEmail = true;
    this.reservationWithOriginDestination = false;
  }

  showOriginDestination() {
    this.reservationWithOriginDestination = true;
    this.reservationWithEmail = false;
  }

  showStation() {
    this.dataReservation.originOrDestinationName = '';
    this.selectorService.loadStations();
    this.selectorService.togglePopup();
    this.isFocusedStation = this.selectorService.viewPopup;
  }

  stationSelected(station: any) {
    this.dataReservation.originOrDestinationName = station.name;
    this.dataReservation.originOrDestinationCode = station.code;
    this.selectorService.hidePopup();
    this.isFocusedStation = this.selectorService.viewPopup;
  }

  showCalendar() {
    $('#vyCalendar').parent().removeClass('range-datepicker');
    this.calendarService.toggleShowDatePicker();
    this.isFocusedCalendar = this.calendarService.isShowDatePicker;
  }

  selectedDate(date: Date) {
    this.dataReservation.date = date;
    this.calendarService.toggleShowDatePicker();
    this.isFocusedCalendar = this.calendarService.isShowDatePicker;
  }

  myFlightTomorrow() {
    this.dataReservation.date = new Date();
    this.dataReservation.date.setDate(this.dataReservation.date.getDate() + 1);
    this.dataReservation.date.setHours(0, 0, 0, 0);
    this.calendarService.hideDatePicker();
    this.isFocusedCalendar = this.calendarService.isShowDatePicker;
  }

  onSubmit(checkInform: NgForm) {
    if (checkInform.valid) {
      this.validation = false;
      this._linksHubService.linkReservation(this.reservationWithEmail, this.dataReservation);
    } else {
      this.validation = true;
    }
  }

  filterStationsByKey(key: string) {
    this.selectorService.filterByKey(key);
    this.isFocusedStation = true;
  }
}
