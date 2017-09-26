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
    this.flightGoingDisabledDays = this.flightDatesService.getFlightDisabledDays(this.dataFlight.origin.code, this.dataFlight.destination.code);
    this.subjectFlightGoingDisabledDays.next(this.flightGoingDisabledDays);
    this.flightReturnDisabledDays = this.flightDatesService.getFlightDisabledDays(this.dataFlight.destination.code, this.dataFlight.origin.code);
    this.subjectFlightReturnDisabledDays.next(this.flightReturnDisabledDays);
  }

  selectedGoingDate() {
    this.calendarService.toggleShowDatePicker();
    let origin = '';
    let destination = '';
    if (this.dataFlight) {
      origin = this.dataFlight.origin.code;
      destination = this.dataFlight.destination.code;
    }
    this.flightReturnDisabledDays = this.flightDatesService.getFlightDisabledDays(this.dataFlight.destination.code, this.dataFlight.origin.code);
    this.subjectFlightReturnDisabledDays.next(this.flightReturnDisabledDays);
    this.dateReturn.refresh();
  }

  selectedReturnDate() {
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
    this.calendarService.roundTrip();
  }
}
