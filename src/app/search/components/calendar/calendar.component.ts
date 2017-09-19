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

  public isComeBack: boolean;

  public minDateAux: Date;

  public customParams: Object;

  public isRoundTrip: boolean;
  public isOneWay: boolean;

  constructor( public calendarService: CalendarService) {

    this.isComeBack = true;

    this.customParams = {
      minDate: 0,
      maxDate: 90,
      numberOfMonths: 3,
      firstDay: 1,
      dateFormat: 'dd/mm/yy',
      dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    };
 }

  ngOnInit() {}

  toggleDatePickerGoing() {
    let self = this;
    $('#vyCalendarComeBack').datepicker('destroy');
    $('#vyCalendarGoing').datepicker({
      minDate: 0,
      numberOfMonths: 3,
      onSelect: function() {
        let dateSelected = $(this).datepicker('getDate');
        self.dateGoing = dateSelected;
        self.minDateAux = dateSelected
        $('#inputGoing').val($.datepicker.formatDate('dd/mm/yy', dateSelected));
        self.dateComeBack = new Date(self.dateGoing.getFullYear(), self.dateGoing.getMonth(), self.dateGoing.getDate() + 7 )
        $('#inputComeBack').val($.datepicker.formatDate('dd/mm/yy', self.dateComeBack))
        $('#vyCalendarGoing').datepicker('destroy');
      }
    });
    $('#vyCalendarGoing').datepicker('setDate', self.dateGoing);
  }

  toggleDatePickerComeBack() {
    let self = this;
    $('#vyCalendarGoing').datepicker('destroy');
    $('#vyCalendarComeBack').datepicker({
      rangeSelect: true,
      numberOfMonths: 3,
      minDate: self.minDateAux || 0,
      beforeShow: function(input, inst ) {
        $(this).find('.ui-datepicker td').off();
        $(this).find('.ui-datepicker').on('mouseenter', 'td', function() {
          $(this).parent().addClass('finalRow');
          $('.finalRow').parents('.ui-datepicker-group-last').parent().find('.ui-datepicker-group-middle').find('tr').last().addClass('finalRowRangeOtherTable');
          $('.finalRow').parents('.ui-datepicker-group-last').parent().find('.ui-datepicker-group-first').find('tr').last().addClass('finalRowRangeOtherTable');
          $('.finalRow').parents('.ui-datepicker-group-middle').parent().find('.ui-datepicker-group-first').find('tr').last().addClass('finalRowRangeOtherTable');
          $('.finalRowRangeOtherTable').find('td:not(.ui-datepicker-unselectable)').addClass('ui-state-active');
          $('.finalRowRangeOtherTable').prevAll().find('td:not(.ui-datepicker-unselectable)').addClass('ui-state-active');
          $('.finalRow').prevAll().find('td:not(.ui-datepicker-unselectable)').addClass('ui-state-active');
          $(this).prevAll('td:not(.ui-datepicker-unselectable)').addClass('ui-state-active');
        });
        $(this).find('.ui-datepicker').on('mouseleave', 'td', function() {
          $(this).parent().removeClass('finalRow');
          $('#vyCalendarComeBack .ui-datepicker td').removeClass('ui-state-active');
          $('.finalRowRange').removeClass('finalRowRange').find('.ui-state-active').removeClass('ui-state-active');
          $('.finalRowRangeOtherTable').removeClass('finalRowRangeOtherTable').find('.ui-state-active').removeClass('ui-state-active');
        });
        $(this).datepicker('refresh');
      },
      beforeShowDay: function (date) {
        date.setHours(0, 0, 0, 0);
        let maxDate = self.dateComeBack;
        if (date.getTime() === self.dateGoing.valueOf()) {
          return [true, 'ui-state-active'];
        }
        if (date > self.dateGoing && date <= self.dateComeBack ) {
          return [true, 'ui-state-active'];
        }
        return [true, ''];
      },
      onSelect: function () {
        let dateSelected = $(this).datepicker('getDate');
        self.dateComeBack = dateSelected;
        $('#inputComeBack').val($.datepicker.formatDate('dd/mm/yy', dateSelected))
        $('#vyCalendarComeBack').datepicker('destroy');
      }
    });
    $('#vyCalendarComeBack').datepicker('setDate', self.dateComeBack);
  }

  addComeBack() {
    this.calendarService.roundTrip();
  }
}
