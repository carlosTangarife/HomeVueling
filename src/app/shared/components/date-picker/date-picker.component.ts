import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { CalendarService } from 'app/shared/services/calendar.service';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: '[app-date-picker]',
  templateUrl: './date-picker.component.html'
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  @Input()
  inputId: string;

  @Input()
  label: string;

  @Input()
  date: Date

  public minDateAux: Date;
  public customParams: any;

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

  ngAfterViewInit() {
    let self = this;
    $('#' + this.inputId).datepicker({
      minDate: 0,
      numberOfMonths: 3,
      beforeShow: function(dateText, inst) {
        setTimeout(function() {
          $('#ui-datepicker-div').css({
            position: 'relative',
            top: 0,
            left: 0
          });
          $('#vyCalendar').append($('#ui-datepicker-div'));
        }, 0);
      },
      beforeShowDay: function (date) {
        let dateText = $.datepicker.formatDate('yy-mm-d', date);
        return [self.calendarService.fligthGoingDisabledDays.indexOf(dateText) === -1];
      },
      onSelect: function(date, inst) {
        self.calendarService.toggleShowDatePicker();
        let dateSelected = $(this).datepicker('getDate');
        self.date = dateSelected;
        self.minDateAux = dateSelected;
        // self.calendarService.getFlightReturnDisabledDays(self.dataFlight.destination.code, self.dataFlight.origin.code);
      }
    }).keydown(this.keyDownEvent);
  }

  keyDownEvent(event) {
    //   TAB: 9
    //  LEFT: 37
    //    UP: 38
    // RIGHT: 39
    //  DOWN: 40
    // ENTER: 13
    //             IE        OTHER
    let code = event.keyCode || event.which;
    // If key is not TAB
    if (code !== 9) {
      event.preventDefault();
      // And arrow keys used "for performance on other keys"
      if (code === 37 || code === 38 || code === 39 || code === 40) {
        // Get current date
        let parts = $(this).val().split('/');
        let currentDate = new Date(parts[2], parts[1] - 1, parts[0]);
        // Show next/previous day/week
        switch (code) {
            // LEFT, -1 day
          case 37: currentDate.setDate(currentDate.getDate() - 1); break;
            // UP, -1 week
          case 38: currentDate.setDate(currentDate.getDate() - 7); break;
            // RIGHT, +1 day
          case 39: currentDate.setDate(currentDate.getDate() + 1); break;
            // DOWN, +1 week
          case 40: currentDate.setDate(currentDate.getDate() + 7); break;
        }
        // If result is ok then write it
        if (currentDate != null) {
          $(this).datepicker('setDate', currentDate);
        }
      } else if (code === 13) {
        $(this).find('.ui-datepicker-current-day').click();
      } else {
        return false; // If other keys pressed.. return false
      }
    }
  }
}
