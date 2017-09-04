import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms/src/forms';
import { IFlight, IStation, IMarket, IStationList, IDestination } from './flight.model';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../../shared/services/config.service';
import { StationService } from '../../../shared/services/station.service';
import { FlightService } from '../../../search/components/flight/flight.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html'
})
export class FlightComponent implements OnInit {
  public stations: IStationList;
  public markets: any;
  public dataFlight: IFlight;
  public originPopup = false;
  public destinationPopup = false;
  public passengerFocused = false;

  @Output() stateOverlay = new EventEmitter<boolean>();

  constructor(private _configService: ConfigService, private _stationService: StationService, private _flightService: FlightService) { }

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
    this.stations = this._configService.environment['stations'];
    this.markets = this._configService.environment['markets'];
    this._flightService.getStations();
    this._flightService.getMarketsByIata(this.dataFlight.origin.code);
    this._flightService.getDestinations();
  }

  onSubmit(formFlight: NgForm) {
    this._flightService.saveSearch(this.dataFlight);
    console.log(formFlight);
    window.location.href = '/';
  }

  clearInputDestination(el?) {
    this.dataFlight.destination.code = '';
    this.dataFlight.destination.name = '';
    this._flightService.getMarketsByIata(this.dataFlight.origin.code)
    this._flightService.getDestinations();
    this.toggleDestinationPopUp(el ? el : null);
  }

  clearInputOrigin() {
    this.dataFlight.origin.code = '';
    this.dataFlight.origin.name = '';
    this._flightService.getStations();
    this.clearInputDestination();
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
}
