import { CalendarService } from './../../../shared/services/calendar.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IFlight } from '../../models/flight.model';

@Component({
  selector: '[app-calendar]',
  templateUrl: './calendar.component.html'
})

export class CalendarComponent implements OnInit {
  @Input()
  dataFlight: IFlight

  @Input()
  isMulti: boolean;

  @Input()
  isMultiFlight: boolean;

  public minDateAux: Date;
  public customParams: Object;
  public id: string;

  constructor(public calendarService: CalendarService) {
    this.customParams = {
      minDate: 0,
      maxDate: 90,
      numberOfMonths: 3,
      firstDay: 1,
      dateFormat: 'dd/mm/y',
      dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    };
  }

  ngOnInit() {

  }
}
