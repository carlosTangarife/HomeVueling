import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-date-picker]',
  templateUrl: './date-picker.component.html'
})
export class DatePickerComponent implements OnInit {

  /**
   * Me be Going and Comeback
   * @type {string}
   * @memberof DatePickerComponent
   */
  @Input()
  typeDatePicker: string;

  constructor() { }

  ngOnInit() {
  }

}
