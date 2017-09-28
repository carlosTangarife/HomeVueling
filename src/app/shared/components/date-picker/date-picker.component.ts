import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ViewChild } from '@angular/core';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: '[app-date-picker]',
  templateUrl: './date-picker.component.html'
})
export class DatePickerComponent implements OnInit, AfterViewInit {
  @ViewChild('datePicker')
  datePicker: Element;

  @Input()
  inputId: string;

  @Input()
  label: string;

  @Input()
  currentDate: Date;

  @Input()
  minDate: Date;

  @Input()
  format: string;

  @Input()
  flightDisabledDays: Array<string>;

  @Input()
  validation: boolean;

  @Output()
  selectedDate = new EventEmitter<Date>();

  constructor() {
    this.flightDisabledDays = [];
    this.validation = false;
    this.format = 'dd/MM/yy';
  }

  ngOnInit() {
    $.datepicker.setDefaults($.extend($.datepicker.regional['es']));
  }

  ngAfterViewInit() {
    let self = this;
    $('#' + this.inputId).datepicker({
      dateFormat: self.getFormatDateJs(),
      firstDay: 1,
      minDate: 0,
      numberOfMonths: 3,
      showAnim: 'slideDown',
      beforeShow: self.calendarBeforeShow,
      beforeShowDay: function (date) {
        let dateText = $.datepicker.formatDate('yy-m-d', date);
        if (self.flightDisabledDays.indexOf(dateText) === -1) {
          if (self.minDate) {
            let maxDate = self.currentDate;
            let dateSelected = $(this).datepicker('getDate');
            self.currentDate = dateSelected;
            if (date.getTime() === self.minDate.valueOf()) {
              return [true, 'ui-datepicker-travel-time ui-datepicker-current-day travelTime'];
            }
            if (dateSelected && date.getTime() === dateSelected.valueOf()) {
              return [true, 'ui-datepicker-travel-time ui-datepicker-end-day travelTime endDay'];
            }
            if (date > self.minDate && date <= self.currentDate ) {
              return [true, 'ui-datepicker-travel-time travelTime'];
            }
          }
          return [true, ''];
        } else {
          return [false];
        }
      },
      onSelect: function(dateText, inst) {
        let date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
        self.selectedDate.emit(date);
      }
    }).keydown(this.keyDownEvent);
  }

  show() {
    $('#' + this.inputId).datepicker('show');
  }

  refresh() {
    $('#' + this.inputId).datepicker('refresh');
  }

  setOption(option: string, value: any) {
    $('#' + this.inputId).datepicker('option', option, value);
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
      if (code === 37 || code === 38 || code === 39 || code === 40) {
        let currentDate = $(this).datepicker('getDate');
        switch (code) {
          case 37:
            currentDate.setDate(currentDate.getDate() - 1);
            break;
          case 38:
            currentDate.setDate(currentDate.getDate() - 7);
            break;
          case 39:
            currentDate.setDate(currentDate.getDate() + 1);
            break;
          case 40:
            currentDate.setDate(currentDate.getDate() + 7);
            break;
        }
        if (currentDate != null) {
          $(this).datepicker('setDate', currentDate);
        }
      } else if (code === 13) {
        $(this).datepicker().find('.ui-datepicker-current-day').click();
      }
    }
  }

  getFormatDateJs(): string {
    let formatjs = 'dd/mm/y';
    if (this.format) {
      let split = this.format.split('/');
      formatjs = split[2].length > 2 ? 'dd/mm/yy' : 'dd/mm/y';
    }
    return formatjs;
  }
}
