import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IFlight } from '../../models/flight.model';
import { FlightDatesService } from '../../../shared/services/flight-dates.service';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';
import { CalendarService } from '../../services/calendar.service';

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

  @Output()
  selectedDateGoing = new EventEmitter<Date>();

  @Output()
  isFocused = new EventEmitter<boolean>();

  public flightGoingDisabledDays = new Array<string>();
  public flightReturnDisabledDays = new Array<string>();
  private subjectFlightGoingDisabledDays = new BehaviorSubject<Array<string>>(this.flightGoingDisabledDays);
  public flightGoingDisabledDays$ = this.subjectFlightGoingDisabledDays.asObservable();
  private subjectFlightReturnDisabledDays = new BehaviorSubject<Array<string>>(this.flightReturnDisabledDays);
  public flightReturnDisabledDays$ = this.subjectFlightReturnDisabledDays.asObservable();

  constructor(public flightDatesService: FlightDatesService, public calendarService: CalendarService) { }

  ngOnInit() {
    this.calendarService.isOneWay$.subscribe(val => {
      if (this.calendarService.isShowDatePicker && val) {
        this.isFocused.emit(false);
      }
    });
  }

  getFlightDisabledDays() {
    let origin = '';
    let destination = '';
    if (this.dataFlight) {
      origin = this.dataFlight.origin.code;
      destination = this.dataFlight.destination.code;
      this.selectedDateGoing.emit(this.dataFlight.going);
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
    if (this.dateReturn) {
      if (this.dataFlight.return <= this.dataFlight.going) {
        this.dataFlight.return = event;
      }
      this.dateReturn.setMinDate(event);
      this.dateReturn.refresh();
    }
    this.selectedDateGoing.emit(event);
    this.isFocused.emit(this.calendarService.isShowDatePicker);
  }

  selectedReturnDate(event: Date) {
    this.dataFlight.return = event;
    this.calendarService.toggleShowDatePicker();
    this.isFocused.emit(this.calendarService.isShowDatePicker);
  }

  toggleDatePickerGoing() {
    this.calendarService.onGoing();
    $('#vyCalendar').parent().removeClass('range-datepicker');
    if (this.calendarService.isGoing) {
      this.dateGoing.show();
    }
    this.dateGoing.refresh();
    this.isFocused.emit(this.calendarService.isShowDatePicker);
  }

  toggleDatePickerComeBack() {
    this.calendarService.onComeBack();
    $('#vyCalendar').parent().addClass('range-datepicker');
    if (this.calendarService.isComeBack) {
      this.dateReturn.show();
    }
    this.dateReturn.refresh();
    this.isFocused.emit(this.calendarService.isShowDatePicker);
  }

  addComeBack() {
    if (this.dataFlight.return <= this.dataFlight.going) {
      let date = new Date(this.dataFlight.going.getFullYear(),
        this.dataFlight.going.getMonth(), this.dataFlight.going.getDate() + 7);
      this.dataFlight.return = date;
    }
    this.getFlightReturnDisabledDays();
    this.calendarService.roundTrip();
  }
}
