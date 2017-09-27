import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '../../../shared/services/config.service';
import { IIconLink } from '../../../shared/models/commons.model';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-index-search',
  templateUrl: './index-search.component.html',
  providers: [CalendarService]
})
export class IndexSearchComponent implements OnInit {
  isFlight: boolean;
  isCheckIn: boolean;
  isMulti: boolean;
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
    this.isCheckIn = false;
    this.isReservation = false;
    this.isOverlay = false;
  }

  setTagFlight() {
    this.isFlight = true;
    this.isCheckIn = false;
    this.isReservation = false;
  }

  setTagCheckin() {
    this.isFlight = false;
    this.isCheckIn = true;
    this.isReservation = false;
  }

  setTagBooking() {
    this.isFlight = false;
    this.isCheckIn = false;
    this.isReservation = true;
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

  setMulti(value: boolean) {
    this.isMulti = value;
  }

  showCalendarOptionsBar(): boolean {
    return !this.isCheckIn && !this.isReservation && !this.isMulti;
  }
}
