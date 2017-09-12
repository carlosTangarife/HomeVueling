import { ITypePassenger } from '../models/passenger.model';
import { TYPE_PASSENGER } from '../enums/type-passenger.enum';

export const TYPE_PAX_LIST: Array<ITypePassenger> = [
    {label: 'adults', rulAge: 'adultsCaption', type: TYPE_PASSENGER[TYPE_PASSENGER.Adults]},
    {label: 'children', rulAge: 'childrenCaption', type: TYPE_PASSENGER[TYPE_PASSENGER.Children]},
    {label: 'infants', rulAge: 'infantsCaption', type: TYPE_PASSENGER[TYPE_PASSENGER.Infants]},
    {label: 'extraSeat', rulAge: 'plusMoreInfo', type: TYPE_PASSENGER[TYPE_PASSENGER.ExtraSeat]}
];
