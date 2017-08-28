export interface IPassenger {
  adult: number,
  children: number,
  babies: number,
  extraSeat: number,
  totalPassengers: number
};

export interface IStation {
  countryName?: string,
  countryCode?: string,
  iataName: string,
  iataCode: string
};

export interface IStations {
  station: IStation,
  country: string
};

export interface IStationsResent {
  station: IStation,
  country: string
}

export interface IFlight {
  origin: IStation,
  destination: IStation,
  going: Date,
  return: Date,
  passenger: IPassenger
};
