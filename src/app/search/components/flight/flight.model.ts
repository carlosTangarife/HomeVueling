import { Observable } from 'rxjs/Observable';

export interface IStation {
  macCode?: string,
  name: string,
  code: string,
  countryCode?: string,
  countryName?: string,
  isRecent?: boolean,
  order?: number
};

export interface IStationList {
  StationList: IStation[]
};

export interface IDestination {
  connection: boolean,
  largefamily: boolean,
  residents: boolean,
  destination: string
};

export interface IMarket {
  macCode?: string,
  name: string,
  code: string,
  countryCode?: string,
  countryName?: string,
  connection: boolean,
  largefamily: boolean,
  residents: boolean,
  isRecent?: boolean,
  order?: number
};

export interface IPassengers {
  adults: number,
  children: number,
  infants: number,
  extraSeat: number,
  totalPassengers: number
};

export interface IFlight {
  origin?: IStation,
  destination?: IStation,
  going?: Date,
  return?: Date,
  passengers: IPassengers
};

export interface IDataPassenger {
  less: boolean,
  more: boolean,
  typePassenger: string
};

export interface ITypePassenger {
  label: string,
  rulAge: string,
  type: string,
  data?: IDataMinusPlus
};

export interface IDataMinusPlus {
  minus: boolean,
  plus: boolean,
  value: Observable<number>
};
