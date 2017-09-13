export interface IPassengerRules {
  Max: number;
  Min: number;
  UrlMax: string;
  Adults: IMaxAndMinRule,
  Children: IMaxAndMinRule,
  Infants: IMaxAndMinRule,
  ExtraSeat: IMaxAndMinRule
};

export interface IMaxAndMinRule {
  IsEnabled: boolean,
  Max: number,
  Min: number,
  Default: number,
  MaxWhenAdults?: number,
  Dependent?: string[]
};
