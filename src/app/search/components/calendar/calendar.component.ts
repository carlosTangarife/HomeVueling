import { Component } from '@angular/core';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: '[app-calendar]',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {


  toggleDatePicker(typeDatePicker: string) {
    if (typeDatePicker === 'going') {
      $('#js-origin-flight-datepiker-going').addClass('show');
      $('#oneWay-going').prop('checked', true);
      $('#js-origin-flight-datepiker-comeBack').removeClass('show');
    } else {
      $('#js-origin-flight-datepiker-comeBack').addClass('show');
      $('#js-origin-flight-datepiker-going').removeClass('show');
    }
  }
}

function toggleRoundTrip() {
  $('.js-add-date-range-to').toggleClass('activate');
  $('.js-date-range-to').toggleClass('activate');
}

$('#roundTrip-going').on( 'change', function() {
  if ( $(this).is(':checked') ) {
    toggleRoundTrip();
  }
});

$('#oneWay-going').on( 'change', function() {
  if ( $(this).is(':checked') ) {
    toggleRoundTrip();
  }
});
