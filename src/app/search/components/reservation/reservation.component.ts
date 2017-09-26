import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { environment } from '../../../../environments/environment';

/*Local Services */
import { CalendarService } from '../../services/calendar.service';
import { SelectorService } from '../../../shared/services/selector.service';
import { CheckInService } from '../../services/check-in.service';

/*Models using interface */
import { IStation } from '../../../shared/models/station.model';
import { ICheckIn } from '../../models/check-in.model';

@Component({
  selector: '[app-reservation]',
  templateUrl: './reservation.component.html',
  providers: [CheckInService, SelectorService]
})
export class ReservationComponent implements OnInit {
  public codeBooking: string;
  public email: string;
  public keyCookie: string;
  public isEmail: boolean;
  public isOriginDestination: boolean;
  public isShowStation: boolean;
  public station: IStation;
  public validation: boolean;
  public flightTomorrow: Date;

  @Output() selectedOrigin: EventEmitter<string> = new EventEmitter();

  constructor(public checkInService: CheckInService, public selectorService: SelectorService, public calendarService: CalendarService) {
    this.isEmail = true;
    this.isOriginDestination = false;
    this.isShowStation = false;
    this.keyCookie = environment.keyCheckInCookie;
    this.validation = false;
    this.flightTomorrow = null;
   }

  ngOnInit() {
    this.selectorService.loadStations();
    this.codeBooking = this.checkInService.getCodeBooking(this.keyCookie);
  }

  showEmail() {
    this.isEmail = true;
    this.isOriginDestination = false;
  }

  showOriginDestination() {
    this.isOriginDestination = true;
    this.isEmail = false;
  }

  showStation() {
    this.isShowStation = !this.isShowStation;
  }

  stationSelected(station: any) {
    this.station = station.name;
  }

  showCalendar() {
    this.calendarService.toggleShowDatePicker();
  }

  selectedDate(date: Date) {
    this.flightTomorrow = date;
    this.calendarService.toggleShowDatePicker();
  }

  myFlightTomorrow() {
    this.flightTomorrow = new Date();
    this.flightTomorrow.setDate(this.flightTomorrow.getDate() + 1);
  }

  onSubmit(forma: NgForm) {
    this.validation = true;
  }
}
