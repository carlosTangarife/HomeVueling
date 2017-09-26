import { CalendarService } from '../../../services/calendar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-calendar-options]',
  templateUrl: './calendar-options.component.html'
})
export class CalendarOptionsComponent implements OnInit {

  constructor(public calendarService: CalendarService) { }

  ngOnInit() {
  }

  changeRoundTrip() {
    this.calendarService.roundTrip();
  }

  changeOneWay() {
    this.calendarService.oneWay();
  }
}
