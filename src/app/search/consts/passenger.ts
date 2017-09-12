import { ITypePassenger } from '../models/passenger.model';

export const enum TYPE_PASSENGER {
    adults,
    children,
    infants,
    extraSeat
};

export const TYPE_PAX_LIST: Array<ITypePassenger> = [
    {label: 'adults', rulAge: 'adultCaption', type: TYPE_PASSENGER.adults.toString()},
    {label: 'children', rulAge: 'childrenCaption', type: TYPE_PASSENGER.children.toString()},
    {label: 'infants', rulAge: 'infantCaption', type: TYPE_PASSENGER.infants.toString()},
    {label: 'extraseat', rulAge: 'plusMoreInfo', type: TYPE_PASSENGER.extraSeat.toString()}
];
