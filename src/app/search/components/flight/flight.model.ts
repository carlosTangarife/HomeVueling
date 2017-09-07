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

export interface IFlight {
  origin?: IStation,
  destination?: IStation,
  going?: Date,
  return?: Date,
};
