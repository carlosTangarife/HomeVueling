import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CheckInService } from "./check-in.service";
import { HttpModule } from "@angular/http";


@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
  providers: [CheckInService]
})
export class CheckInComponent implements OnInit {
  checkIn: string;
  public loggedIn: boolean = false;

  constructor(private checkinService: CheckInService) { }

  ngOnInit() {
    this.getCheckIn();
    
  }
  
  getCheckIn(){
    this.checkinService.getCheckIn()
      .subscribe(check => this.checkIn = check);
  }

  

}
