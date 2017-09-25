import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { CalendarService } from '../../services/calendar.service';

import { IFlight } from './../../../search/models/flight.model';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-input-calendar',
  templateUrl: './input-calendar.component.html',
  styleUrls: ['./input-calendar.component.scss']
})
export class InputCalendarComponent implements OnInit, AfterViewInit {

  @Input()
  label: string;

  @Input()
  id: string;

  @Input()
  argument: string;

  @Input()
  dataFlight: IFlight;

  constructor(public calendarService: CalendarService) {
  }

  ngOnInit(): void {
    // this.calendarService.afterInit(this.id, this.argument);
  }

  ngAfterViewInit() {
    this.calendarService.afterInit(this.id, this.argument);
  }


  // selectFunction() {
  //   debugger;
  //   if (this.id === 'inputGoing') {
  //     this.calendarService.toggleDatePickerGoing('#' + this.id);
  //   }else if (this.id === 'inputComeBack') {
  //     this.calendarService.toggleDatePickerComeBack('#' + this.id);
  //   }else if (this.id === 'checkIn') {
  //     this.calendarService.toggleDatePickercheckIn('#' + this.id);
  //   }
  // }
}

