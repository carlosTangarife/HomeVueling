import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/forms';
import { IFlight, IStation, IMarket, IStationList, IDestination } from './flight.model';
import { DestinationsService } from 'app/shared/services/destinations.service';
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
  public recentOrigins: IStation[];
  public origins: IStation[];
  public recentDestinations: IMarket[];
  public destinations: IMarket[];
  public dataFlight: IFlight;
  public originPopup = false;
  public destinationPopup = false;
  constructor(private _ds: DestinationsService,
    private _configService: ConfigService,
    private _stationService: StationService) { }

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
        adult: 3,
        children: 3,
        babies: 0,
        extraSeat: 0,
        totalPassengers: 6
      }
    };
    this.stations = this._configService.environment['stations'];
    this.markets = this._configService.environment['markets'];
    this.getStations();
    // this.recentOrigins = this._ds.getRecentSearch();
    // this.recentDestinations = this._ds.getRecentSearch();
    this.recentOrigins = this.getRecentOrigins();
    this.recentDestinations = this.getRecentDestinations();
  }

  getStations(key?: string) {
    this.origins = key ? this.filterStations(
      this.stations.StationList, key.toLowerCase()) : this.stations.StationList;
  }

  filterStations(options: IStation[], key: string): IStation[] {
    return options
      .filter(opt => opt.name.toLowerCase().match(key)
        || opt.code.toLowerCase().match(key)
        || opt.countryCode.toLowerCase().match(key)
        || opt.countryName.toLowerCase().match(key));
  }

  filterMarkets(options: IMarket[], key: string): IMarket[] {
    return options
      .filter(opt => opt.name.toLowerCase().match(key)
        || opt.code.toLowerCase().match(key)
        || opt.countryCode.toLowerCase().match(key)
        || opt.countryName.toLowerCase().match(key));
  }

  getRecentOrigins(): IStation[] {
    let cookie = this._stationService.getOriginsStations();
    return cookie.map(val => this.stations.StationList
      .find(station => station.code === val.iataCode));
  }

  getRecentDestinations(): IMarket[] {
    let cookie = this._stationService.getDestinationsStations();
    return cookie.map(val => this.markets[this.dataFlight.origin.code]
      .find(station => station.destination === val.iataCode))
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
      }).filter(Boolean);
  }

  onSubmit(formFlight: NgForm) {
    this._stationService.saveStationOrigin(this.dataFlight.origin.code);
    this._stationService.saveStationDestination(this.dataFlight.destination.code);
    console.log(formFlight);
    window.location.href = '/';
  }

  moreAdults() {
    if (this.dataFlight.passenger.adult < 16) {
      this.dataFlight.passenger.adult += 1;
      this.totalPassenger();
    }
  }

  lessAdults() {
    if (this.dataFlight.passenger.adult > 0) {
      this.dataFlight.passenger.adult -= 1;
      this.totalPassenger();
    }
  }

  moreBabies() {
    if (this.dataFlight.passenger.babies < 16) {
      this.dataFlight.passenger.babies += 1;
      this.totalPassenger();
    }
  }

  lessBabies() {
    if (this.dataFlight.passenger.babies > 0) {
      this.dataFlight.passenger.babies -= 1;
      this.totalPassenger();
    }
  }

  moreChildren() {
    if (this.dataFlight.passenger.children < 16) {
      this.dataFlight.passenger.children += 1;
      this.totalPassenger();
    }
  }

  lessChildren() {
    if (this.dataFlight.passenger.children > 0) {
      this.dataFlight.passenger.children -= 1;
      this.totalPassenger();
    }
  }

  moreExtraSeat() {
    if (this.dataFlight.passenger.extraSeat < 16) {
      this.dataFlight.passenger.extraSeat += 1;
      this.totalPassenger();
    }
  }

  lessExtraSeat() {
    if (this.dataFlight.passenger.extraSeat > 0) {
      this.dataFlight.passenger.extraSeat -= 1;
      this.totalPassenger();
    }
  }

  totalPassenger() {
    this.dataFlight.passenger.totalPassengers = this.dataFlight.passenger.adult + this.dataFlight.passenger.babies + this.dataFlight.passenger.children + this.dataFlight.passenger.extraSeat;
  }

  clearInputDestination() {
    this.dataFlight.destination.code = '';
    this.dataFlight.destination.name = '';
    this.getStationsDestination(this.dataFlight.origin.code)
    this.toggleDestinationPopUp();
  }

  getStationsDestination(iata: string, key?: string): IMarket[] {
    if (!iata) {
      return [];
    }
    let marketsIata = this.markets[iata];
    let destinations: IMarket[] = marketsIata.map(market => {
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
    }).filter(Boolean);
    return this.destinations = key ? this.filterMarkets(destinations, key.toLowerCase()) : destinations;
  }

  clearInputOrigin() {
    this.dataFlight.origin.code = '';
    this.dataFlight.origin.name = '';
    this.getStations();
    this.togglePopUp();
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

  toggleDestinationPopUp() {
    if (this.dataFlight.origin.code) {
      this.originPopup = false;
      this.destinationPopup = !this.destinationPopup;
    } else {
      this.togglePopUp();
    }
  }
}
