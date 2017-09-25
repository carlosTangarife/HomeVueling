import { CalendarService } from './../../../shared/services/calendar.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IFlight } from '../../models/flight.model';

declare var jQuery: any;
declare var $: any;

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
    let self = this;
    this.id = this.isMultiFlight ? '#vyCalendarMulti' : '#vyCalendarGoing';
    let idInput = this.isMultiFlight ? '#inputMulti' : '#inputGoing';
    $(this.id).datepicker({
      minDate: 0,
      numberOfMonths: 3,
      showAnim: 'fade',
      beforeShow: function(dateText, inst) {
        $('#ui-datepicker-div').css({
          position: 'relative',
          top: 0,
          left: 0
        });
        $(this.id).append($('#ui-datepicker-div'));
      },
      beforeShowDay: function (date) {
        let dateText = $.datepicker.formatDate('yy-mm-d', date);
        return [self.calendarService.fligthGoingDisabledDays.indexOf(dateText) === -1];
      },
      onSelect: function() {
        let dateSelected = $(this).datepicker('getDate');
        self.dataFlight.going = dateSelected;
        self.minDateAux = dateSelected;
        $(idInput).val($.datepicker.formatDate('dd/mm/y', dateSelected));
        if (!self.isMulti) {
          self.dataFlight.return = new Date(self.dataFlight.going.getFullYear(), self.dataFlight.going.getMonth(), self.dataFlight.going.getDate() + 7 );
          $('#inputComeBack').val($.datepicker.formatDate('dd/mm/y', self.dataFlight.return));
        }
        self.calendarService.toggleShowDatePicker();
        self.calendarService.getFlightReturnDisabledDays(self.dataFlight.destination.code, self.dataFlight.origin.code);
      }
    }).keydown(this.keyDownEvent);

    this.calendarService.isRoundTrip$.subscribe(enabled => {
      if (!enabled) {
        $('#vyCalendarComeBack').datepicker('destroy');
      }
    });
  }

  initReturnDatePicker() {
    let self = this;
    $('#vyCalendarComeBack').datepicker({
      rangeSelect: true,
      numberOfMonths: 3,
      minDate: this.minDateAux || 0,
      showAnim: 'fade',
      beforeShow: this.calendarBeforeShow,
      beforeShowDay: function (date) {
        let dateText = $.datepicker.formatDate('yy-mm-d', date);
        if (self.calendarService.fligthReturnDisabledDays.indexOf(dateText) === -1) {
          date.setHours(0, 0, 0, 0);
          let maxDate = self.dataFlight.return;
          let dateSelected = $(this).datepicker('getDate');
          if (date.getTime() === self.dataFlight.going.valueOf()) {
            return [true, 'ui-datepicker-travel-time ui-datepicker-current-day travelTime'];
          }
          if (dateSelected && date.getTime() === dateSelected.valueOf()) {
            return [true, 'ui-datepicker-travel-time ui-datepicker-end-day travelTime endDay'];
          }
          if (date > self.dataFlight.going && date <= self.dataFlight.return ) {
            return [true, 'ui-datepicker-travel-time travelTime'];
          }
          return [true, ''];
        } else {
          return [false];
        }
      },
      onSelect: function () {
        let dateSelected = $(this).datepicker('getDate');
        self.dataFlight.return = dateSelected;
        $('#inputComeBack').val($.datepicker.formatDate('dd/mm/y', dateSelected));
        self.calendarService.toggleShowDatePicker();
      }
    }).keydown(this.keyDownEvent);
  }

  getFlightDisabledDays() {
    if (this.dataFlight) {
      this.calendarService.getFlightGoingDisabledDays(this.dataFlight.origin.code, this.dataFlight.destination.code);
    }
  }

  toggleDatePickerGoing() {
    if (this.isMultiFlight) {
      this.calendarService.onMulti();
    } else {
      this.calendarService.onGoing();
    }
    $(this.id).parent().removeClass('range-datepicker');
    $(this.id).datepicker('setDate', this.dataFlight.going);
    $(this.id).datepicker('refresh');
  }

  toggleDatePickerComeBack() {
    this.calendarService.onComeBack();
    $('#vyCalendarComeBack').parent().addClass('range-datepicker');
    $('#vyCalendarComeBack').datepicker('setDate', this.dataFlight.return);
    $('#vyCalendarComeBack').datepicker('refresh');
  }

  addComeBack() {
    this.calendarService.roundTrip();
    this.initReturnDatePicker();
  }

  calendarBeforeShow(input, inst) {
    $('#ui-datepicker-div').css({
      position: 'relative',
      top: 0,
      left: 0
    });
    $('#vyCalendarComeBack').append($('#ui-datepicker-div'));
    $(this).find('.ui-datepicker td').off();
    $(this).find('.ui-datepicker').on('mouseenter', 'td', function() {
      $('#vyCalendarComeBack .ui-datepicker td').removeClass('ui-datepicker-travel-time ui-datepicker-end-day');
      $(this).parent().addClass('finalRow');
      $('.finalRow').parents('.ui-datepicker-group-last').parent().find('.ui-datepicker-group-middle').find('tr').last().addClass('finalRowRangeOtherTable');
      $('.finalRow').parents('.ui-datepicker-group-last').parent().find('.ui-datepicker-group-first').find('tr').last().addClass('finalRowRangeOtherTable');
      $('.finalRow').parents('.ui-datepicker-group-middle').parent().find('.ui-datepicker-group-first').find('tr').last().addClass('finalRowRangeOtherTable');
      $('.finalRowRangeOtherTable').find('td:not(.ui-datepicker-unselectable)').addClass('ui-datepicker-travel-time');
      $('.finalRowRangeOtherTable').prevAll().find('td:not(.ui-datepicker-unselectable)').addClass('ui-datepicker-travel-time');
      $('.finalRow').prevAll().find('td:not(.ui-datepicker-unselectable)').addClass('ui-datepicker-travel-time');
      $(this).prevAll('td:not(.ui-datepicker-unselectable)').addClass('ui-datepicker-travel-time');
      $(this).addClass('ui-datepicker-travel-time');
    });
    $(this).find('.ui-datepicker').on('mouseleave', 'td', function() {
      $(this).parent().removeClass('finalRow');
      $('#vyCalendarComeBack .ui-datepicker td').removeClass('ui-datepicker-travel-time');
      $('.finalRowRange, .finalRowRangeOtherTable').removeClass('finalRowRange finalRowRangeOtherTable');
      $('#vyCalendarComeBack .ui-datepicker').find('.travelTime').addClass('ui-datepicker-travel-time');
      $('#vyCalendarComeBack .ui-datepicker').find('.endDay').addClass('ui-datepicker-end-day');
    });
    $(this).datepicker('refresh');
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
