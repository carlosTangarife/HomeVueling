import { ITypePassenger } from '../models/passenger.model';
import { TYPE_PASSENGER } from '../enums/type-passenger.enum';

export const TYPE_PAX_LIST: Array<ITypePassenger> = [
    {label: 'adults', rulAge: 'adultCaption', type: TYPE_PASSENGER[TYPE_PASSENGER.adults]},
    {label: 'children', rulAge: 'childrenCaption', type: TYPE_PASSENGER[TYPE_PASSENGER.children]},
    {label: 'infants', rulAge: 'infantCaption', type: TYPE_PASSENGER[TYPE_PASSENGER.infants]},
    {label: 'extraseat', rulAge: 'plusMoreInfo', type: TYPE_PASSENGER[TYPE_PASSENGER.extraSeat]}
];
