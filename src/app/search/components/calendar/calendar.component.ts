import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IFlight } from '../../models/flight.model';
import { CalendarService } from './../../../shared/services/calendar.service';
import { FlightDatesService } from '../../../shared/services/flight-dates.service';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: '[app-calendar]',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {
  @ViewChild('dateGoing')
  dateGoing: DatePickerComponent;

  @ViewChild('dateReturn')
  dateReturn: DatePickerComponent;

  @Input()
  dataFlight: IFlight

  @Input()
  isMulti: boolean;

  public flightGoingDisabledDays = new Array<string>();
  public flightReturnDisabledDays = new Array<string>();
  private subjectFlightGoingDisabledDays = new BehaviorSubject<Array<string>>(this.flightGoingDisabledDays);
  public flightGoingDisabledDays$ = this.subjectFlightGoingDisabledDays.asObservable();
  private subjectFlightReturnDisabledDays = new BehaviorSubject<Array<string>>(this.flightReturnDisabledDays);
  public flightReturnDisabledDays$ = this.subjectFlightReturnDisabledDays.asObservable();

  constructor(public flightDatesService: FlightDatesService, public calendarService: CalendarService) { }

  ngOnInit() {
  }

  getFlightDisabledDays() {
    let origin = '';
    let destination = '';
    if (this.dataFlight) {
      origin = this.dataFlight.origin.code;
      destination = this.dataFlight.destination.code;
    }
    this.flightGoingDisabledDays = this.flightDatesService.getFlightDisabledDays(origin, destination);
    this.subjectFlightGoingDisabledDays.next(this.flightGoingDisabledDays);
    if (this.calendarService.isRoundTrip) {
      this.flightReturnDisabledDays = this.flightDatesService.getFlightDisabledDays(destination, origin);
      this.subjectFlightReturnDisabledDays.next(this.flightReturnDisabledDays);
    }
  }

  getFlightReturnDisabledDays() {
    let origin = '';
    let destination = '';
    if (this.dataFlight) {
      origin = this.dataFlight.origin.code;
      destination = this.dataFlight.destination.code;
    }
    this.flightReturnDisabledDays = this.flightDatesService.getFlightDisabledDays(destination, origin);
    this.subjectFlightReturnDisabledDays.next(this.flightReturnDisabledDays);
  }

  selectedGoingDate(event: Date) {
    this.dataFlight.going = event;
    this.calendarService.toggleShowDatePicker();
    if (this.dataFlight.return <= this.dataFlight.going) {
      this.dataFlight.return = event;
      this.dateReturn.setMinDate(this.dataFlight.return);
    }
    this.dateReturn.refresh();
  }

  selectedReturnDate(event: Date) {
    this.dataFlight.return = event;
    this.calendarService.toggleShowDatePicker();
  }

  toggleDatePickerGoing() {
    this.calendarService.onGoing();
    $('#vyCalendar').parent().removeClass('range-datepicker');
    this.dateGoing.refresh();
  }

  toggleDatePickerComeBack() {
    this.calendarService.onComeBack();
    $('#vyCalendar').parent().addClass('range-datepicker');
    this.dateReturn.refresh();
  }

  addComeBack() {
    if (this.dataFlight.return <= this.dataFlight.going) {
      let date = new Date(this.dataFlight.going.getFullYear(), this.dataFlight.going.getMonth(), this.dataFlight.going.getDate() + 7);
      this.dataFlight.return = date;
      this.dateReturn.setMinDate(date);
    }
    this.getFlightReturnDisabledDays();
    this.calendarService.roundTrip();
  }
}
