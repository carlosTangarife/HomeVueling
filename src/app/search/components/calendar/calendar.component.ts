import { CalendarService } from './../../../shared/services/calendar.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: '[app-calendar]',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})

export class CalendarComponent implements OnInit {

  @Input()
  dateGoing: Date;

  @Input()
  dateComeBack: Date;

  public isComeBack: boolean;

  public dateComeBackAux: Date;

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

  ngOnInit() { }

  toggleDatePickerGoing() {
    let self = this;
    $('#vyCalendarComeBack').datepicker('destroy');
    $('#vyCalendarGoing').datepicker({
      minDate: 0,
      numberOfMonths: 3,
      onSelect: function() {
        let dateSelected = $(this).datepicker('getDate');
        self.dateGoing = dateSelected;
        self.dateComeBackAux = dateSelected;
        $('#inputGoing').val($.datepicker.formatDate('dd/mm/y', dateSelected));
        $('#vyCalendarGoing').datepicker('destroy');
      }
    });
    $('#vyCalendarGoing').datepicker('setDate', self.dateGoing);
  }

  toggleDatePickerComeBack() {
    let self = this;
    $('#vyCalendarGoing').datepicker('destroy');
    $('#vyCalendarComeBack').datepicker({
      numberOfMonths: 3,
      minDate: self.dateComeBackAux || 0,
      onSelect: function() {
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
