import { IDataMinusPlus } from '../../shared/models/minus-plus.model';

export interface IPassengers {
    adults: number,
    children: number,
    infants: number,
    extraSeat: number,
    totalPassengers: number
};

export interface ITypePassenger {
    label: string,
    rulAge: string,
    type: string,
    data?: IDataMinusPlus
};
