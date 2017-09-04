import { Component, OnInit, Output, OnDestroy, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms/src/forms';
import { IFlight, IStation, IMarket, IStationList, IDestination } from './flight.model';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../../shared/services/config.service';
import { StationService } from '../../../shared/services/station.service';
import { FlightService } from '../../../search/components/flight/flight.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  providers: [FlightService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightComponent implements OnInit, OnDestroy {

  public dataFlight: IFlight;
  public originPopup = false;
  public destinationPopup = false;
  public passengerFocused = false;

  public originRecent: IStation[];
  public originCurrent: IStation[];
  private sourceCurrentSubscription: Subscription;
  private sourceRecentSubscription: Subscription;

  @Output() stateOverlay = new EventEmitter<boolean>();

  constructor(protected _fs: FlightService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataFlight = {
      origin: {
        code: 'BCN',
        name: 'Barcelona'
      },
      destination: {
        code: 'MAD',
        name: 'Madrid'
      },
      going: new Date(),
      return: new Date(17, 8, 15),
      passenger: {
        adult: 1,
        children: 1,
        babies: 0,
        extraSeat: 0,
        totalPassengers: 1
      }
    };

    this._fs.getStations();
    this._fs.getMarketsByIata('BCN');
    this._fs.getDestinations();

    this.sourceCurrentSubscription = this._fs.sourceCurrent$.subscribe((data) => {
      this.originCurrent = data;
    this.cdRef.markForCheck();
    });
    this.sourceRecentSubscription = this._fs.sourceRecent$.subscribe((data) => {
      this.originRecent = data;
    this.cdRef.markForCheck();
    });
  }

  onSubmit(formFlight: NgForm) {
    this._fs.saveSearch(this.dataFlight);
    console.log(formFlight);
    window.location.href = '/';
  }

  filterStations(data: string) {
    this._fs.filterStations(data);
    this.cdRef.markForCheck();
  }

  clearInputOrigin() {
    this.dataFlight.origin.code = '';
    this.dataFlight.origin.name = '';
    this._fs.getMarketsByIata(this.dataFlight.origin.code);
    this._fs.getDestinations();
    this.clearInputDestination();
  }

  clearInputDestination(el?) {
    this.dataFlight.destination.code = '';
    this.dataFlight.destination.name = '';
    this._fs.getMarketsByIata(this.dataFlight.origin.code);
    this._fs.getDestinations();
    this.toggleDestinationPopUp(el ? el : null);
  }


  originSelected(originSelected: IStation) {
    this.dataFlight.origin.name = originSelected.name;
    this.dataFlight.origin.code = originSelected.code;
    this.dataFlight.origin.countryName = originSelected.countryName;
    this.togglePopUp();
    this.clearInputDestination();
  }

  destinationSelected(destinationSelected: IStation) {
    this.dataFlight.destination.name = destinationSelected.name;
    this.dataFlight.destination.code = destinationSelected.code;
    this.dataFlight.destination.countryName = destinationSelected.countryName;
    this.toggleDestinationPopUp();
  }

  togglePopUp() {
    this.destinationPopup = false;
    this.originPopup = !this.originPopup;
  }

  toggleDestinationPopUp(el?) {
    if (this.dataFlight.origin.code) {
      this.originPopup = false;
      this.destinationPopup = !this.destinationPopup;
    } else {
      if (el) {
        el.focus();
      }
      this.togglePopUp();
    }
  }

  clickPassenger() {
    this.passengerFocused = !this.passengerFocused;
    this.stateOverlay.emit();
  }

  ngOnDestroy() {
    this.sourceCurrentSubscription.unsubscribe();
    this.sourceRecentSubscription.unsubscribe();
  }
}
