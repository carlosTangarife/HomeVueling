import { Component, OnInit } from '@angular/core';
import { CheckInService } from "./check-in.service";

@Component({
  selector: '[app-check-in]',
  templateUrl: './check-in.component.html',
  providers: [CheckInService]
})
export class CheckInComponent implements OnInit {
    public codeBook: string;
    public email: string;
    public isOrigin: boolean;

  constructor(public checkInService : CheckInService) {
    this.isOrigin = true;
   }

  ngOnInit() {
    this.codeBook = this.checkInService.getCodeBooking('ABC123');        
  }

  /*changeChekIn(){
    this.
  }*/

 
}
