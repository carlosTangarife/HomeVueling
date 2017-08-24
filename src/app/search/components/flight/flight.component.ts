import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html'
})
export class FlightComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  test1(iata: string) {
    alert(iata + 'pruba');
    // this.stationDestinations$ = this._ds.getStationsDestination(iata);
  }
}
