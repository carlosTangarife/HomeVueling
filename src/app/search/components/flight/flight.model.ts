import { Observable } from "rxjs/Observable";

export interface IPassenger {
  adult: number,
  children: number,
  babies: number,
  extraSeat: number,
  totalPassengers: number
};

export interface IStation {
  macCode?: string,
  name: string,
  code: string,
  countryCode?: string,
  countryName?: string
};

export interface IDestination {
  connection: boolean,
  largefamily: boolean,
  residents: boolean,
  code: string
};

export interface IMarket {
  destination: Observable<IStation>,
  market: IDestination
};

export interface IFlight {
  origin: IStation,
  destination: IStation,
  going: Date,
  return: Date,
  passenger: IPassenger
};
