import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IFlight } from '../../models/flight.model';
import { FlightDatesService } from '../../../shared/services/flight-dates.service';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';
import { CalendarService } from '../../services/calendar.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: '[app-multicity]',
  templateUrl: './multicity.component.html'
})
export class MulticityComponent implements OnInit {
  @ViewChild('dateMulti')
  dateMulti: DatePickerComponent;

  @Input()
  dataFlight: IFlight;

  @Output()
  removeMulticity = new EventEmitter<boolean>();

  public isFocusedOrigin: boolean;
  public isFocusedDestination: boolean;
  public isFocusedCalendar: boolean;
  public flightDisabledDays = new Array<string>();
  private subjectFlightDisabledDays = new BehaviorSubject<Array<string>>(this.flightDisabledDays);
  public flightDisabledDays$ = this.subjectFlightDisabledDays.asObservable();

  constructor(public flightDatesService: FlightDatesService, public calendarService: CalendarService) { }

  ngOnInit() {
    this.calendarService.isMulti$.subscribe(val => {
      if (!val) {
        this.isFocusedCalendar = false;
      }
    });
  }

  getFlightDisabledDays() {
    let origin = '';
    let destination = '';
    if (this.dataFlight && this.dataFlight.multi) {
      origin = this.dataFlight.multi.origin.code;
      destination = this.dataFlight.multi.destination.code;
    }
    this.flightDisabledDays = this.flightDatesService.getFlightDisabledDays(origin, destination);
    this.subjectFlightDisabledDays.next(this.flightDisabledDays);
    this.setMinDate(this.dataFlight.going);
  }

  toggleDatePickerMulti() {
    this.calendarService.onMulti();
    $('#vyCalendar').parent().removeClass('range-datepicker');
    if (this.calendarService.isMulti) {
      this.dateMulti.show();
    }
    this.dateMulti.refresh();
    this.isFocusedCalendar = this.calendarService.isShowDatePicker;
  }

  selectedMultiDate(event: Date) {
    this.dataFlight.multi.going = event;
    this.calendarService.toggleShowDatePicker();
    this.isFocusedCalendar = this.calendarService.isShowDatePicker;
  }

  clickMulticity() {
    this.removeMulticity.emit(false);
  }

  setMinDate(date: Date) {
    this.dateMulti.setOption('minDate', this.dataFlight.going);
    if (!this.dataFlight.multi.isActive) {
      this.dataFlight.multi.going = new Date(date.getTime());
    } else if (this.dataFlight.multi.going <= date) {
      this.dataFlight.multi.going = new Date(date.getTime());
      if (this.dataFlight.origin.code && this.dataFlight.multi.origin.code
        && this.dataFlight.destination.code && this.dataFlight.multi.destination.code
        && this.dataFlight.origin.code === this.dataFlight.multi.origin.code
        && this.dataFlight.destination.code === this.dataFlight.multi.destination.code) {
        this.dataFlight.multi.going.setDate(date.getDate() + 1);
        this.dateMulti.setOption('minDate', this.dataFlight.multi.going);
      }
    }
    this.dateMulti.refresh();
  }
}
