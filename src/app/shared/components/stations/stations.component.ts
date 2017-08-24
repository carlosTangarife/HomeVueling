import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IStationInfo } from 'app/shared/model/stationInfo.model';
import { DestinationsService } from '../../../search/services/destinations.service';

@Component({
  selector: 'app-stations',
  templateUrl: './station.component.html'
})
export class StationsComponent implements OnInit {

  @Input() type: string;
  @Input() label: string;

  protected station: IStationInfo;
  protected focusIn: boolean;
  protected focusOut: boolean;

  public stationRecent$: Observable<IStationInfo[]>;
  public stationOrigin$;
  public stationDestinations$;
  constructor(public _ds: DestinationsService) {}

  ngOnInit() {
    if (this.type === 'origin') {
      this.stationOrigin$ = this._ds.getStationsOrigin();
      this.stationRecent$ = this._ds.getRecentSearch();
    }
  }

  prueba1() {
    console.log('focusado');
      this.focusIn = true;
      this.focusOut = false;
  }

  prueba2() {
    console.log('on-focusado');
      this.focusOut = true;
      this.focusIn = false;
  }

  prueba3(te: IStationInfo) {
    this.station = te;
    console.log(this.station);
    this.prueba2();
  }
}
