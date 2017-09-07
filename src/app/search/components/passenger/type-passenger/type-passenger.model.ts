export interface IDataPassenger {
  less: boolean,
  more: boolean,
  typePassenger: string
}

export interface ITypePassengerList {
  label: string,
  rulAge: string,
  type: string,
  iconLess?: string,
  iconMore?: string
}

export interface IPassenger {
  adult: number,
  children: number,
  babies: number,
  extraSeat: number,
  totalPassengers?: number
};
