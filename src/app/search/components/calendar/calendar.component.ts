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
      dateFormat: 'dd/mm/y',
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
        $('#inputGoing').val($.datepicker.formatDate('dd/mm/y', dateSelected));
        self.dateComeBack = new Date(self.dateGoing.getFullYear(), self.dateGoing.getMonth(), self.dateGoing.getDate() + 7 )
        $('#inputComeBack').val($.datepicker.formatDate('dd/mm/y', self.dateComeBack))
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
        alert('holassss');
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
        $('#inputComeBack').val($.datepicker.formatDate('dd/mm/y', dateSelected))
        $('#vyCalendarComeBack').datepicker('destroy');
      }
    });
    $('#vyCalendarComeBack').datepicker('setDate', self.dateComeBack);
  }

  addComeBack() {
    this.calendarService.roundTrip();
  }
}
