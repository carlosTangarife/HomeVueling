import { ITypePassenger } from '../models/passenger.model';

export const TYPE_PAX_LIST: Array<ITypePassenger> = [
    {label: 'adults', rulAge: 'adultCaption', type: 'adults'},
    {label: 'children', rulAge: 'childrenCaption', type: 'children'},
    {label: 'infants', rulAge: 'infantCaption', type: 'infants'},
    {label: 'extraseat', rulAge: 'plusMoreInfo', type: 'extraSeat'}
];
