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

export interface IMarket {
  destination: string,
  connection: boolean,
  largefamily: boolean,
  residents: boolean
}

export interface IMarketList {
  code: IMarket
};

export interface IFlight {
  origin: IStation,
  destination: IStation,
  going: Date,
  return: Date,
  passenger: IPassenger
};
