export interface IRulesPassenger {
  extraSeatEnabled?: boolean;
  residentsLargeFamilyEnabled?: boolean;
  max: number;
  min: number;
  urlmax: string;
  adults: IMaxAndMinRule,
  children: IMaxAndMinRule,
  infants: IMaxAndMinRule,
  extras: IMaxAndMinRule
};

export interface IMaxAndMinRule {
  max: number,
  min: number,
  maxWhenAdults?: number,
  dependent?: string[]
};
