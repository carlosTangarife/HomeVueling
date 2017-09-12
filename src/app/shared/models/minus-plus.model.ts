import { Observable } from 'rxjs/Observable';

export interface IDataMinusPlus {
    minus: boolean,
    plus: boolean,
    value: Observable<number>
};
