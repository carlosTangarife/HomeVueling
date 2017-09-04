import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms/src/forms';
import { IFlight, IStation, IMarket, IStationList, IDestination } from './flight.model';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from 'app/shared/services/config.service';
import { StationService } from 'app/shared/services/station.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html'
})
export class FlightComponent implements OnInit {
  public stations: IStationList;
  public markets: any;
  public marketsIata: IMarket[];
  public filteredOrigins: IStation[];
  public filteredDestinations: IMarket[];
  public dataFlight: IFlight;
  public originPopup = false;
  public destinationPopup = false;
  public passengerFocused = false;

  @Output() stateOverlay = new EventEmitter<boolean>();

  constructor(private _configService: ConfigService, private _stationService: StationService) { }

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
    this.getStations();
    this.getMarketsByIata(this.dataFlight.origin.code);
    this.getDestinations();
  }

  getStations() {
    let recentOrigins = this.getRecentOrigins();
    this.filteredOrigins = this.stations.StationList.map(station => {
      station.isRecent = recentOrigins.includes(station);
      station.order = recentOrigins.indexOf(station);
      return station;
    });
  }

  filterStationsByRecent(isRecent: boolean) {
    let filtered = this.filteredOrigins.filter(opt => opt.isRecent === isRecent);
    return isRecent ? filtered.sort((a, b) => a.order - b.order) : filtered;
  }

  filterStations(key?: string) {
    this.originPopup = true;
    this.filteredOrigins = key ? this.stations.StationList
      .filter(opt => opt.name.toLowerCase().match(key.toLowerCase())
        || opt.code.toLowerCase().match(key.toLowerCase())
        || opt.countryCode.toLowerCase().match(key.toLowerCase())
        || opt.countryName.toLowerCase().match(key.toLowerCase())) : this.stations.StationList;
  }

  filterDestinationsByRecent(isRecent: boolean) {
    let filtered = this.filteredDestinations.filter(opt => opt.isRecent === isRecent);
    return isRecent ? filtered.sort((a, b) => a.order - b.order) : filtered;
  }

  filterDestinations(key?: string) {
    this.destinationPopup = true;
    this.filteredDestinations = key ? this.marketsIata
      .filter(opt => opt.name.toLowerCase().match(key.toLowerCase())
        || opt.code.toLowerCase().match(key.toLowerCase())
        || opt.countryCode.toLowerCase().match(key.toLowerCase())
        || opt.countryName.toLowerCase().match(key.toLowerCase())) : this.marketsIata;
  }

  getRecentOrigins(): IStation[] {
    let cookie = this._stationService.getOriginsStations();
    return cookie.map(val => this.stations.StationList
      .find(station => station.code === val.iataCode));
  }

  getRecentDestinations(): IMarket[] {
    let cookie = this._stationService.getDestinationsStations();
    return cookie.map(val => this.marketsIata
      .find(station => station.code === val.iataCode)).filter(Boolean);
  }

  onSubmit(formFlight: NgForm) {
    this._stationService.saveStationOrigin(this.dataFlight.origin.code);
    this._stationService.saveStationDestination(this.dataFlight.destination.code);
    console.log(formFlight);
    window.location.href = '/';
  }

  clearInputDestination(el?) {
    this.dataFlight.destination.code = '';
    this.dataFlight.destination.name = '';
    this.getMarketsByIata(this.dataFlight.origin.code)
    this.getDestinations();
    this.toggleDestinationPopUp(el ? el : null);
  }

  getDestinations() {
    let recentDestinations = this.getRecentDestinations();
    this.filteredDestinations = this.marketsIata.map(station => {
      station.isRecent = recentDestinations.includes(station);
      station.order = recentDestinations.indexOf(station);
      return station;
    });
  }

  getMarketsByIata(iata: string) {
    this.marketsIata = iata && this.markets[iata] ? this.markets[iata]
      .map(market => {
        let station: IStation = this.stations.StationList.find(s => s.code === market.destination);
        if (station) {
          let result: IMarket = {
            code: market.destination,
            connection: market.connection,
            residents: market.residents,
            largefamily: market.largefamily,
            countryCode: station.countryCode,
            countryName: station.countryName,
            macCode: station.macCode,
            name: station.name
          };
          return result;
        }
      }).filter(Boolean) : this.marketsIata = [];
  }

  clearInputOrigin() {
    this.dataFlight.origin.code = '';
    this.dataFlight.origin.name = '';
    this.getStations();
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

  deleteOrigins() {
    this._stationService.removeOriginsStations();
    this.clearInputOrigin();
  }

  deleteDestinations() {
    this._stationService.removeDestinationsStations();
    this.clearInputDestination();
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
