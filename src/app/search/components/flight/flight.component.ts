import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  totalVuelos= 0;

  constructor() { }

  ngOnInit() {
  }

  addFlightTest(){
    this.totalVuelos++;
  }

}
