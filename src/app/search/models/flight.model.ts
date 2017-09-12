import { IPassengers } from './passenger.model';
import { IStation } from '../../shared/models/station.model';

export interface IFlight {
  origin?: IStation,
  destination?: IStation,
  going?: Date,
  return?: Date,
  passengers: IPassengers
};
