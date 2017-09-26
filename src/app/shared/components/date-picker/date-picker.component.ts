import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
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

  @Input()
  dateGoing: Date

  @Input()
  fligthDisabledDays: Array<string>

  @Output()
  selectedDate = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let self = this;
    $('#' + this.inputId).datepicker({
      closeText: 'Cerrar',
      prevText: '&#x3C;Ant',
      nextText: 'Sig&#x3E;',
      currentText: 'Hoy',
      monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun',
      'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      weekHeader: 'Sm',
      dateFormat: 'dd/mm/y',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: '',
      minDate: 0,
      numberOfMonths: 3,
      showAnim: 'slideDown',
      beforeShow: self.calendarBeforeShow,
      beforeShowDay: function (date) {
        let dateText = $.datepicker.formatDate('yy-m-d', date);
        if (self.fligthDisabledDays.indexOf(dateText) === -1) {
          if (self.dateGoing) {
            let maxDate = self.date;
            let dateSelected = $(this).datepicker('getDate');
            self.date = dateSelected;
            if (date.getTime() === self.dateGoing.valueOf()) {
              return [true, 'ui-datepicker-travel-time ui-datepicker-current-day travelTime'];
            }
            if (dateSelected && date.getTime() === dateSelected.valueOf()) {
              return [true, 'ui-datepicker-travel-time ui-datepicker-end-day travelTime endDay'];
            }
            if (date > self.dateGoing && date <= self.date ) {
              return [true, 'ui-datepicker-travel-time travelTime'];
            }
          }
          return [true, ''];
        } else {
          return [false];
        }
      },
      onSelect: function(dateText, inst) {
        self.selectedDate.emit($(this).datepicker('getDate'));
      }
    }).keydown(this.keyDownEvent);
  }

  show() {
    $('#' + this.inputId).datepicker('show');
  }

  refresh() {
    $('#' + this.inputId).datepicker('refresh');
  }

  setMinDate(date: Date) {
    $('#' + this.inputId).datepicker('option', 'minDate', date);
  }

  calendarBeforeShow(input, inst) {
    setTimeout(function() {
      $('#ui-datepicker-div').css({
        position: 'relative',
        top: 0,
        left: 0
      });
      $('#vyCalendar').append($('#ui-datepicker-div'));
      if (input.id === 'inputComeBack') {
        $('#vyCalendar').find('.ui-datepicker td').off();
        $('#vyCalendar').find('.ui-datepicker').on('mouseenter', 'td', function() {
          $('#vyCalendar .ui-datepicker td').removeClass('ui-datepicker-travel-time ui-datepicker-end-day');
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
        $('#vyCalendar').find('.ui-datepicker').on('mouseleave', 'td', function() {
          $(this).parent().removeClass('finalRow');
          $('#vyCalendar .ui-datepicker td').removeClass('ui-datepicker-travel-time');
          $('.finalRowRange, .finalRowRangeOtherTable').removeClass('finalRowRange finalRowRangeOtherTable');
          $('#vyCalendar .ui-datepicker').find('.travelTime').addClass('ui-datepicker-travel-time');
          $('#vyCalendar .ui-datepicker').find('.endDay').addClass('ui-datepicker-end-day');
        });
      }
    }, 0);
  }

  keyDownEvent(event) {
    //   TAB: 9
    //  LEFT: 37
    //    UP: 38
    // RIGHT: 39
    //  DOWN: 40
    // ENTER: 13
    // event.keyCode: IE
    let code = event.keyCode || event.which;
    if (code !== 9) {
      event.preventDefault();
      if (code === 37 || code === 38 || code === 39 || code === 40) {
        let currentDate = $(this).datepicker('getDate');
        switch (code) {
          case 37: currentDate.setDate(currentDate.getDate() - 1); break;
          case 38: currentDate.setDate(currentDate.getDate() - 7); break;
          case 39: currentDate.setDate(currentDate.getDate() + 1); break;
          case 40: currentDate.setDate(currentDate.getDate() + 7); break;
        }
        if (currentDate != null) {
          $(this).datepicker('setDate', currentDate);
        }
      } else if (code === 13) {
        $(this).datepicker().find('.ui-datepicker-current-day').click();
      } else {
        return false;
      }
    }
  }
}
