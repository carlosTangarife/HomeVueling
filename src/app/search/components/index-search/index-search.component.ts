import { Component, OnInit, Input } from '@angular/core';

import { IIconLink } from '../../../shared/models/commons.model';

import { FlightService } from '../../services/flight.service';
import { CalendarService } from '../../services/calendar.service';
import { TabStateService } from '../../services/tab-state.service';
import { ConfigService } from '../../../shared/services/config.service';

@Component({
  selector: 'app-index-search',
  templateUrl: './index-search.component.html',
  providers: [TabStateService, CalendarService]
})
export class IndexSearchComponent implements OnInit {
  isMulti: boolean;
  isOverlay: boolean;
  listIconLink: IIconLink[];

  constructor(
    private configService: ConfigService,
    private flightService: FlightService,
    public tabStateService: TabStateService,
    public calendarService: CalendarService,
  ) { }

  ngOnInit() {
    this.flightService.initFlight();
    this.tabStateService.setConfiguration(this.configService.getConfiguration());
    let tabsLink = this.tabStateService.getTabConfiguration('FlightSearch', 'Tab');
    this.listIconLink = [];
    for (let key in tabsLink) {
      if (tabsLink.hasOwnProperty(key)) {
        tabsLink[key].Label = key;
        this.listIconLink.push(tabsLink[key]);
      }
    }
    this.isOverlay = false;

    this.flightService.stateTab$.subscribe(state => {
      this.tabStateService.activeTab(this.flightService.stateTab);
    });
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
    return this.tabStateService.isActive('FlightSearch') && !this.isMulti;
  }
}
