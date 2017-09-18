import { IPassengers } from './passenger.model';
import { IDiscount } from './discount.model';
import { IStation } from '../../shared/models/station.model';

export interface IFlight {
  origin?: IStation,
  destination?: IStation,
  multi?: IMulti,
  going?: Date,
  return?: Date,
  passengers?: IPassengers,
  discount?: IDiscount
};

export interface IMulti {
  isActive: boolean,
  origin?: IStation,
  destination?: IStation,
  going?: Date
}
