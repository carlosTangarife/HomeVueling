import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IFlight } from '../../models/flight.model';
import { CalendarService } from './../../../shared/services/calendar.service';
import { FlightDatesService } from '../../../shared/services/flight-dates.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: '[app-calendar]',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {
  @Input()
  dataFlight: IFlight

  public flightGoingDisabledDays: Array<string>;
  public flightReturnDisabledDays: Array<string>;
  private subjectFlightGoingDisabledDays = new BehaviorSubject<Array<string>>(this.flightGoingDisabledDays);
  public flightGoingDisabledDays$ = this.subjectFlightGoingDisabledDays.asObservable();
  private subjectFlightReturnDisabledDays = new BehaviorSubject<Array<string>>(this.flightReturnDisabledDays);
  public flightReturnDisabledDays$ = this.subjectFlightReturnDisabledDays.asObservable();

  constructor(public flightDatesService: FlightDatesService, public calendarService: CalendarService) { }

  ngOnInit() {
  }

  getFlightDisabledDays() {
    if (this.dataFlight) {
      this.flightGoingDisabledDays = this.flightDatesService.getFlightDisabledDays(this.dataFlight.origin.code, this.dataFlight.destination.code);
      this.subjectFlightGoingDisabledDays.next(this.flightGoingDisabledDays);
    }
  }

  selectedGoingDate() {
    this.calendarService.toggleShowDatePicker();
    this.flightReturnDisabledDays = this.flightDatesService.getFlightDisabledDays(this.dataFlight.destination.code, this.dataFlight.origin.code);
    this.subjectFlightReturnDisabledDays.next(this.flightReturnDisabledDays);
  }

  selectedReturnDate() {
    this.calendarService.toggleShowDatePicker();
  }

  toggleDatePickerGoing() {
    this.calendarService.onGoing();
    $('#vyCalendar').parent().removeClass('range-datepicker');
  }

  toggleDatePickerComeBack() {
    this.calendarService.onComeBack();
    $('#vyCalendar').parent().addClass('range-datepicker');
  }

  addComeBack() {
    this.calendarService.roundTrip();
  }
}
