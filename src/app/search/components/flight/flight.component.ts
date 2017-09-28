import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

/*Local Services */
import { FlightService } from './../../services/flight.service';
import { StationService } from '../../../shared/services/station.service';
import { CookiesWrapper } from './../../../shared/services/cookies-wrapper.service';

/*Models using interface */
import { IFlight } from '../../models/flight.model';

/*third-party library */
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

/*Environment */
import { environment } from '../../../../environments/environment';

/*Component needed to use ViewChild*/
import { DestinationSelectorComponent } from '../../../shared/components/destination-selector/destination-selector.component';

@Component({
  selector: '[app-flight]',
  templateUrl: './flight.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightComponent implements OnInit {
  @ViewChild('destination')
  destination: DestinationSelectorComponent;

  @Output()
  isMulti = new EventEmitter<boolean>();

  public dataFlight: IFlight;
  public isFocusedOrigin: boolean;
  public isFocusedDestination: boolean;
  public isFocusedPassengers: boolean;
  public isFocusedCalendar: boolean;

  constructor(private stationService: StationService, private cookiesWrapper: CookiesWrapper, private flightService: FlightService) {
    this.dataFlight = {}
  }

  ngOnInit() {
    this.dataFlight = _.cloneDeep(this.flightService.dataFlight);
  }

  clickMulticity(multicity: boolean) {
    this.dataFlight.multi.isActive = multicity;
    this.isMulti.next(this.dataFlight.multi.isActive);
  }

  removeMulticity(multicity: boolean) {
    this.clickMulticity(multicity);
    if (this.destination.selectorService.viewPopup) {
      this.destination.showPopupDestination();
      this.destination.isFocused.emit(this.destination.selectorService.viewPopup);
    }
  }

  saveSearch() {
    this.stationService.saveStation(this.dataFlight.origin.code, environment.keyLastSearchOriginCookie, true);
    this.stationService.saveStation(this.dataFlight.destination.code, environment.keyLastSearchDestinationCookie, false);
  }

  onSubmit(flightForm: NgForm) {
    console.log(flightForm, this.dataFlight);
    this.saveSearch();
    this.cookiesWrapper.setCookie(environment.keylastSearchFlight, this.dataFlight);
    console.log(this.cookiesWrapper.getCookie(environment.keylastSearchFlight));
  }
}
