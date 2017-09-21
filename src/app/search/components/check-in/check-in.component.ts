import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckInService } from './check-in.service';
import { SelectorService } from '../../../shared/services/selector.service';
import { ICheckIn } from '../../models/check-in.model';
import { IStation } from '../../../shared/models/station.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: '[app-check-in]',
  templateUrl: './check-in.component.html',
  providers: [CheckInService, SelectorService]
})
export class CheckInComponent implements OnInit {
    form;
    public dataCheckIn: ICheckIn
    public codeBook: string;
    // public email: string;
    public submit: boolean;
    public keyCookie: string;
    public isOrigin: boolean;
    public isChecked: boolean;
    public isShowStation: boolean;
    public station: IStation;
    public validation: boolean;

  @Output() selectedOrigin: EventEmitter<string> = new EventEmitter();

  constructor(public checkInService: CheckInService, public selectorService: SelectorService) {
    this.isOrigin = false;
    this.isShowStation = false;
    this.isChecked = true;
    this.submit = true;
    this.keyCookie = environment.keyCheckInCookie;
    this.validation = true;
   }

  ngOnInit() {
    this.selectorService.loadStations();
    this.codeBook = this.checkInService.getCodeBooking(this.keyCookie);
    this.form = new FormGroup({
      bookingCode: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
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

  onSubmit() {
    this.submit = !this.submit;
  }

  showError = function(user){
    console.log(user);
    console.log(this.validation);
    this.validation = !this.validation;
  }

  // showError() {
  //   console.log(this.validation);
  //   this.validation = !this.validation;
  // }
}

