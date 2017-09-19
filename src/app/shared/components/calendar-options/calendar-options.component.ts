import { CalendarService } from '../../services/calendar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-options',
  templateUrl: './calendar-options.component.html',
  styleUrls: ['./calendar-options.component.css']
})
export class CalendarOptionsComponent implements OnInit {

  public isRoundTrip: boolean;
  public isOneWay: boolean;

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
