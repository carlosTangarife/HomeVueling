import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IMulti } from '../../models/flight.model';
import { CalendarService } from '../../../shared/services/calendar.service';
import { FlightDatesService } from '../../../shared/services/flight-dates.service';

@Component({
  selector: '[app-multicity]',
  templateUrl: './multicity.component.html'
})
export class MulticityComponent implements OnInit {
  @Input()
  dataFlight: IMulti;

  @Output()
  stateOverlay = new EventEmitter<void>();

  @Output()
  removeMulticity = new EventEmitter<boolean>();

  public isFocusedOrigin: boolean;
  public isFocusedDestination: boolean;
  public flightDisabledDays = new Array<string>();
  private subjectFlightDisabledDays = new BehaviorSubject<Array<string>>(this.flightDisabledDays);
  public flightDisabledDays$ = this.subjectFlightDisabledDays.asObservable();

  constructor(public flightDatesService: FlightDatesService, public calendarService: CalendarService) { }

  ngOnInit() {
  }

  getFlightDisabledDays() {
    if (this.dataFlight) {
      this.flightDisabledDays = this.flightDatesService.getFlightDisabledDays(this.dataFlight.origin.code, this.dataFlight.destination.code);
      this.subjectFlightDisabledDays.next(this.flightDisabledDays);
    }
  }

  selectedMultiDate() {
    this.calendarService.toggleShowDatePicker();
  }

  clickInput() {
    this.stateOverlay.emit();
  }

  clickMulticity() {
    this.removeMulticity.emit(false);
  }
}
