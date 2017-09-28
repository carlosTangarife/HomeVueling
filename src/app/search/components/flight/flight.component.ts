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

  constructor(private _stationService: StationService, private cookiesWrapper: CookiesWrapper, private _flightService: FlightService) {
    this.dataFlight = {}
  }

  ngOnInit() {

    this.dataFlight = this._flightService.initFlight();
    // let today = new Date();
    // today.setHours(0, 0, 0, 0);
    // let dataFlight = this.cookiesWrapper.getCookie(environment.keylastSearchFlight);
    // if (dataFlight) {
    //   this.dataFlight = dataFlight;

    //   this.dataFlight.multi.going = new Date(dataFlight.multi.going);
    //   this.dataFlight.going = new Date(dataFlight.going);
    //   this.dataFlight.return = new Date(dataFlight.return);

    // }else {
    //   this.dataFlight = {
    //   origin: {
    //     code: 'ALC',
    //     name: 'Alicante'
    //   },
    //   destination: {
    //     code: 'MAD',
    //     name: 'Madrid'
    //   },
    //   multi: {
    //     isActive: false,
    //     origin: {
    //       code: 'BCN',
    //       name: 'Barcelona'
    //     },
    //     destination: {
    //       code: 'LAX',
    //       name: 'Los Ángeles'
    //     },
    //     going: new Date(today.getTime())
    //   },
    //   passengers: {
    //     Adults : 1,
    //     Infants : 0,
    //     Children: 0,
    //     ExtraSeat: 0,
    //     TotalPassengers: 1
    //   },
    //   discount: {
    //     value: ''
    //   },
    //   going: new Date(today.getTime()),
    //   return: new Date(today.getTime())
    // };
    // }
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
    this._stationService.saveStation(this.dataFlight.origin.code, environment.keyLastSearchOriginCookie, true);
    this._stationService.saveStation(this.dataFlight.destination.code, environment.keyLastSearchDestinationCookie, false);
  }

  onSubmit(flightForm: NgForm) {
    console.log(flightForm, this.dataFlight);
    this.saveSearch();
    this.cookiesWrapper.setCookie(environment.keylastSearchFlight, this.dataFlight);
    console.log(this.cookiesWrapper.getCookie(environment.keylastSearchFlight));
  }
}
