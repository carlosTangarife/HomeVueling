import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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
  @Output() selectedOrigin: EventEmitter<string> = new EventEmitter();
  public keyCookie: string;
  public validation: boolean;
  public isShowStation: boolean;
  public isFocusedStation: boolean;
  public isFocusedCalendar: boolean;
  public isReservationWithEmail: boolean;
  public dataReservation: IReservation;
  public isReservationOriginDestination: boolean;

  constructor(public checkInService: CheckInService, public selectorService: SelectorService, public calendarService: CalendarService, private _linksHubService: LinksHubService) {
    this.validation = false;
    this.dataReservation = {};
    this.isShowStation = false;
    this.isReservationWithEmail = true;
    this.isReservationOriginDestination = false;
    this.keyCookie = environment.keyCheckInCookie;
   }

  ngOnInit() {
    this.selectorService.loadStations();
    this.dataReservation.codeBooking = this.checkInService.getCodeBooking(this.keyCookie);
  }

  showEmail() {
    this.isReservationWithEmail = true;
    this.isReservationOriginDestination = false;
  }

  showOriginDestination() {
    this.isReservationOriginDestination = true;
    this.isReservationWithEmail = false;
  }

  showStation() {
    this.isShowStation = !this.isShowStation;
    this.isFocusedStation = this.isShowStation;
  }

  stationSelected(station: any) {
    this.dataReservation.originOrDestinationName = station.name;
    this.dataReservation.originOrDestinationCode = station.code;
    this.isFocusedStation = this.isShowStation;
  }

  showCalendar() {
    $('#vyCalendar').parent().removeClass('range-datepicker');
    this.calendarService.toggleShowDatePicker();
    this.isFocusedCalendar = this.calendarService.isShowDatePicker;
  }

  selectedDate(date: Date) {
    this.dataReservation.myFlightTomorrow = date;
    this.calendarService.toggleShowDatePicker();
    this.isFocusedCalendar = this.calendarService.isShowDatePicker;
  }

  myFlightTomorrow() {
    this.dataReservation.myFlightTomorrow = new Date();
    this.dataReservation.myFlightTomorrow.setDate(this.dataReservation.myFlightTomorrow.getDate() + 1);
    this.dataReservation.myFlightTomorrow.setHours(0, 0, 0, 0);
  }

  onSubmit(chekInform: NgForm) {
    if (chekInform.valid) {
      this.validation = false;
      this._linksHubService.linkReservation(this.isReservationWithEmail, this.dataReservation);
    }else {
      this.validation = true;
    }
    console.log(this.dataReservation);
  }
}
