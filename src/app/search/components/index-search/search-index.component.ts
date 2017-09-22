import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '../../../shared/services/config.service';
import { IIconLink } from '../../../shared/models/commons.model';
import { CalendarService } from '../../../shared/services/calendar.service';

@Component({
  selector: 'app-index-search',
  templateUrl: './search-index.component.html'
})
export class IndexSearchComponent implements OnInit {
  isFlight: boolean;
  ischeckIn: boolean;
  isOverlay: boolean;
  searcherConfig: any;
  listIconLink: IIconLink[];
  isReservation: boolean;

  constructor(private configService: ConfigService, public calendarService: CalendarService) {
    this.searcherConfig = this.configService.environment['configuration'];
    this.listIconLink = [];
    let tabsLink = this.searcherConfig.FlightSearch.Tab;
    for (let key in tabsLink) {
      if (tabsLink.hasOwnProperty(key)) {
        tabsLink[key].Label = key;
        this.listIconLink.push(tabsLink[key]);
      }
    }
  }

  ngOnInit() {
    this.isFlight = true;
    this.ischeckIn = false;
    this.isReservation = false;
    this.isOverlay = false;
  }

  stateTag(isFlight: boolean, ischeckIn: boolean, isReservation: boolean) {
    this.isFlight = isFlight;
    this.ischeckIn = ischeckIn;
    this.isReservation = isReservation;
  }

  toggleClassOverlay() {
    this.isOverlay = !this.isOverlay;
  }

  showOverlay() {
    this.isOverlay = true;
  }

  hideOverlay() {
    this.isOverlay = false;
  }
}
