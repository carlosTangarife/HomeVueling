import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,

} from '@angular/core';
import { IStationInfo } from 'app/shared/model/stationInfo.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styles: []

})
export class PlacesComponent implements OnInit {
  @Input() places: Observable<IStationInfo[]>;
  @Output() placeSelected: EventEmitter<IStationInfo> = new EventEmitter();
  constructor() {}

  ngOnInit() {
  }

  contador(lenght: number) {
    const res = [];
    for (let i = 1; i < lenght + 1; i++) {
        res.push(i);
      }
      return res;
  }
  sendCode(station: IStationInfo) {
      this.placeSelected.emit(station);
  }
}
