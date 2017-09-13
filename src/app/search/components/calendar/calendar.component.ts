import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: '[app-calendar]',
  templateUrl: './calendar.component.html'
})

export class CalendarComponent implements OnInit {

  constructor() {}

  ngOnInit() { }

  toggleDatePicker(typeDatePicker: string) {
    if (typeDatePicker === 'going') {
      $('#js-origin-flight-datepiker-comeBack').removeClass('show');
      $('#js-origin-flight-datepiker-going').addClass('show');
      $('#oneWay-going').prop('checked', true);
    } else {
      $('#js-origin-flight-datepiker-going').removeClass('show');
      $('#js-origin-flight-datepiker-comeBack').addClass('show');
      $('#roundTrip-comeBack').prop('checked', true);
    }
  }
}
