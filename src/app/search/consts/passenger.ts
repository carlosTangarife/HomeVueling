import { ITypePassenger } from '../models/passenger.model';
import { TYPE_PASSENGER } from '../enums/type-passenger.enum';

export const TYPE_PAX_LIST: Array<ITypePassenger> = [
    {label: 'adults', ruleAge: 'adultsCaption', type: TYPE_PASSENGER[TYPE_PASSENGER.Adults]},
    {label: 'children', ruleAge: 'childrenCaption', type: TYPE_PASSENGER[TYPE_PASSENGER.Children]},
    {label: 'infants', ruleAge: 'infantsCaption', type: TYPE_PASSENGER[TYPE_PASSENGER.Infants]},
    {label: 'extraSeat', ruleAge: 'plusMoreInfo', type: TYPE_PASSENGER[TYPE_PASSENGER.ExtraSeat]}
];
