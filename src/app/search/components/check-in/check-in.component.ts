import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  flagCheckIn: boolean;
  flag: boolean;
  @Input() type: string;
  constructor() {
    this.flagCheckIn = false;
    this.flag = true;
  }

  ngOnInit() {
    if (this.type === 'check-in') {
      this.flagCheckIn = true;
    }
  }

  isEmail() {
      this.flag = true;
  }

  isOrigin() {
    this.flag = !this.flag;
  }

}
