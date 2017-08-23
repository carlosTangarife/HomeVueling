import { Component, OnInit, Input } from '@angular/core';
import { IStationInfo } from 'app/shared/model/stationInfo.model';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.css']
})
export class RecentSearchComponent implements OnInit {
  @Input() istationInfo: IStationInfo;

  constructor() { }

  ngOnInit() {
  }

}
