import { Component, OnInit } from '@angular/core';
import { DestinationsService } from '../../services/destinations.service';
import { Observable } from 'rxjs/Observable';
import { IStationInfo } from 'app/shared/model/stationInfo.model';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html'
})
export class FlightComponent implements OnInit {
  public stationOrigin$;
  public stationDestinations$;
  public stationRecent$: Observable<IStationInfo[]>;

  constructor(public _ds: DestinationsService) { }

  ngOnInit() {
    this.stationOrigin$ = this._ds.getStationsOrigin();
    this.stationRecent$ = this._ds.getRecentSearch();
    console.log(this.stationOrigin$);
  }

  test1(iata: string) {
    alert(iata + 'pruba');
    this.stationDestinations$ = this._ds.getStationsDestination(iata);
  }
}
