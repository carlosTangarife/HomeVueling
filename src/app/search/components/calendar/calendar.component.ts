import { CalendarService } from './../../../shared/services/calendar.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: '[app-calendar]',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {
  @Input()
  dateGoing: Date;

  @Input()
  dateComeBack: Date;

  public minDateAux: Date;
  public isOneWay: boolean;
  public isComeBack: boolean;
  public customParams: Object;
  public isRoundTrip: boolean;

  constructor(public calendarService: CalendarService) {
    this.isComeBack = true;
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
    $('#vyCalendarGoing').datepicker({
      minDate: 0,
      numberOfMonths: 3,
      showAnim: 'fade',
      onSelect: function() {
        let dateSelected = $(this).datepicker('getDate');
        self.dateGoing = dateSelected;
        self.minDateAux = dateSelected;
        $('#inputGoing').val($.datepicker.formatDate('dd/mm/y', dateSelected));
        self.dateComeBack = new Date(self.dateGoing.getFullYear(), self.dateGoing.getMonth(), self.dateGoing.getDate() + 7 );
        $('#inputComeBack').val($.datepicker.formatDate('dd/mm/y', self.dateComeBack));
        self.calendarService.toggleShowDatePicker();
      }
    }).keydown(this.keyDownEvent);
    $('#vyCalendarComeBack').datepicker({
      rangeSelect: true,
      numberOfMonths: 3,
      minDate: this.minDateAux || 0,
      showAnim: 'fade',
      beforeShow: this.calendarBeforeShow,
      beforeShowDay: function (date) {
        date.setHours(0, 0, 0, 0);
        let maxDate = self.dateComeBack;
        let dateSelected = $(this).datepicker('getDate');
        if (date.getTime() === self.dateGoing.valueOf()) {
          return [true, 'ui-datepicker-travel-time ui-datepicker-current-day travelTime'];
        }
        if (dateSelected && date.getTime() === dateSelected.valueOf()) {
          return [true, 'ui-datepicker-travel-time ui-datepicker-end-day travelTime endDay'];
        }
        if (date > self.dateGoing && date <= self.dateComeBack ) {
          return [true, 'ui-datepicker-travel-time travelTime'];
        }
        return [true, ''];
      },
      onSelect: function () {
        let dateSelected = $(this).datepicker('getDate');
        self.dateComeBack = dateSelected;
        $('#inputComeBack').val($.datepicker.formatDate('dd/mm/y', dateSelected));
        self.calendarService.toggleShowDatePicker();
      }
    }).keydown(this.keyDownEvent);
  }

  toggleDatePickerGoing() {
    this.calendarService.onGoing();
    let self = this;
    $('#vyCalendarGoing').parent().removeClass('range-datepicker');
    $('#vyCalendarGoing').datepicker('setDate', self.dateGoing);
    $('#vyCalendarGoing').datepicker('refresh');
  }

  toggleDatePickerComeBack() {
    this.calendarService.onComeBack();
    let self = this;
    $('#vyCalendarComeBack').parent().addClass('range-datepicker');
    $('#vyCalendarComeBack').datepicker('setDate', self.dateComeBack);
    $('#vyCalendarComeBack').datepicker('refresh');
  }

  addComeBack() {
    this.calendarService.roundTrip();
  }

  calendarBeforeShow(input, inst) {
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

  keyDownEvent(e) {
    //   TAB: 9
    //  LEFT: 37
    //    UP: 38
    // RIGHT: 39
    //  DOWN: 40
    // ENTER: 13
    //             IE        OTHER
    let code = e.keyCode || e.which;
    // If key is not TAB
    if (code !== 9) {
      e.preventDefault();
      // And arrow keys used "for performance on other keys"
      if (code === 37 || code === 38 || code === 39 || code === 40) {
        // Get current date
        let parts = $(this).val().split('/');
        console.log(parts);
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
        $('.ui-datepicker-current-day').click();
      } else {
        return false; // If other keys pressed.. return false
      }
    }
  }
}
