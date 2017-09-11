export interface IRulesPassenger {
  extraSeatEnabled?: boolean;
  residentsLargeFamilyEnabled?: boolean;
  max: number;
  min: number;
  urlmax: string;
  adults: IMaxAndMin,
  children: IMaxAndMin,
  infants: IMaxAndMin,
  extras: IMaxAndMin
}

export interface IMaxAndMin {
  max: number,
  min: number,
  maxWhenAdults?: number
}
