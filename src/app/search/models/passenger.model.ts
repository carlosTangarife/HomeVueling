import { IDataMinusPlus } from '../../shared/models/minus-plus.model';

export interface IPassengers {
    Adults: number,
    Children: number,
    Infants: number,
    ExtraSeat: number,
    TotalPassengers: number
};

export interface ITypePassenger {
    label: string,
    rulAge: string,
    type: string,
    data?: IDataMinusPlus
};
