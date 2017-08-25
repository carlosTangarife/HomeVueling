import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IStationInfo } from 'app/shared/model/stationInfo.model';
import { DestinationsService } from '../../services/destinations.service';

@Component({
  selector: 'app-stations',
  templateUrl: './station.component.html',
  providers: [DestinationsService]
})
export class StationsComponent implements OnInit {

  @Input() type: string;
  @Input() label: string;

  public station: IStationInfo;
  public focusIn: boolean;
  public focusOut: boolean;

  public stationRecent$;
  public stations$;
  constructor(public _ds: DestinationsService) {}

  ngOnInit() {
    if (this.type && this.type.length > 0 &&  this.type === 'origin') {
      this.stations$ = this._ds.getStationsOrigin();
      this.stationRecent$ = this._ds.getRecentSearch();
    }
  }

  focused() {
    console.log('focusado');
      this.focusIn = true;
      this.focusOut = false;
  }

  unfocused() {
    console.log('on-focusado');
    setTimeout(() => {
      this.focusOut = true;
      this.focusIn = false;
    }, 0)
  }

  placeSelected(place: IStationInfo) {
    this.station = place;
    this.stations$ = this._ds.getStationsDestination(place.code);
    console.log(this.stations$);
    this.unfocused();
  }
}
