import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

/*Local Services */
import { CalendarService } from '../../../shared/services/calendar.service';
import { SelectorService } from '../../../shared/services/selector.service';
import { CheckInService } from './check-in.service';

/*Models using interface */
import { IStation } from '../../../shared/models/station.model';
import { ICheckIn } from '../../models/check-in.model';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: '[app-check-in]',
  templateUrl: './check-in.component.html',
  providers: [CheckInService, SelectorService]
})
export class CheckInComponent implements OnInit {
    form;
    public dataCheckIn: ICheckIn
    public codeBook: string;
    public email: string;
    public submit: boolean;
    public keyCookie: string;
    public isOrigin: boolean;
    public isChecked: boolean;
    public isShowStation: boolean;
    public station: IStation;
    public validation: boolean;
    public isSpecial: boolean;
    public flightTomorrow: Date;
    public isChekIn: boolean;

  @Output() selectedOrigin: EventEmitter<string> = new EventEmitter();

  constructor(public checkInService: CheckInService, public selectorService: SelectorService, public calendarService: CalendarService) {
    this.isOrigin = false;
    this.isShowStation = false;
    this.isChecked = true;
    this.submit = true;
    this.keyCookie = environment.keyCheckInCookie;
    this.validation = true;
    this.isChekIn = false;
    this.flightTomorrow = null;
   }

  ngOnInit() {
    this.selectorService.loadStations();
    this.codeBook = this.checkInService.getCodeBooking(this.keyCookie);
    this.form = new FormGroup({
      bookingCode: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
      ]))
    });
  }

  omitSpecialCharacters(event: string) {
    debugger;
    const pattern = '([A-Z0-9a-z])';
    let res = event.match(pattern);
    if (res != null) {
      this.isSpecial = false;
    } else {
      this.isSpecial = true;
    }
  }


  changeTypeCheckIn(value) {
    this.isOrigin = value;
  }

  toggleChecked() {
    this.isChecked = !this.isChecked;
  }

  showStation(station: any) {
    this.isShowStation = !this.isShowStation;
  }

  stationSelected(station: any) {
    this.station = station.name;
  }

  toggleShowCalendar() {
    let self = this;
    this.calendarService.toggleShowDatePicker();
    this.isChekIn = !this.isChekIn;
    this.isChekIn ? this.calendarService.onCheckIn() : this.calendarService.offCheckIn()
    $('#vyCalendarCheckIn').datepicker({
      minDate: 0,
      numberOfMonths: 3,
      showAnim: 'fade',
      beforeShow: function() {
        $('#inputflightTomorrow').val($.datepicker.formatDate('dd/mm/yy', this.flightTomorrow));
        $('#vyCalendarCheckIn').datepicker('setDate', self.flightTomorrow);
      },
      onSelect: function() {
        let dateSelected: Date;
        dateSelected = $(this).datepicker('getDate');
        self.flightTomorrow = dateSelected;
        $('#inputflightTomorrow').val($.datepicker.formatDate('dd/mm/yy', dateSelected));
        self.calendarService.toggleShowDatePicker();
        $(this).datepicker('destroy');
      }
    });

  }

  toggleFlightTomorrow() {
    debugger;
    this.flightTomorrow = new Date();
    this.flightTomorrow.setDate(this.flightTomorrow.getDate() + 1);
  }

  onSubmit() {
    this.submit = !this.submit;
  }

  showError(user) {
    this.validation = !this.validation;
  }
}

