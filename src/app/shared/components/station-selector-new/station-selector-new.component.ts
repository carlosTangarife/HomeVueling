import { Component, OnInit, Input } from '@angular/core';
import { DestinationsService } from '../../../search/services/destinations.service';
import { Observable } from 'rxjs/Observable';
import { IStationInfo } from 'app/shared/model/stationInfo.model';


@Component({
  selector: 'app-station-selector-new',
  templateUrl: './station-selector-new.component.html',
  styleUrls: ['./station-selector-new.component.css']
})
export class StationSelectorNewComponent implements OnInit {
  @Input() label: string;
  @Input() stationOrigin: IStationInfo[];

  constructor(public _ds: DestinationsService) {}

  ngOnInit() {
  }
}
