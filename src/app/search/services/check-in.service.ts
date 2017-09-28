import { Injectable } from '@angular/core';
import { ICheckIn } from '../models/check-in.model';
import { CookiesWrapper } from '../../shared/services/cookies-wrapper.service';

@Injectable()
export class CheckInService {
    codeBooking: string;
    key: string;

    constructor(private _cookiesWrapper: CookiesWrapper) { }

    getCodeBooking(key: string): string {
        this.codeBooking = this._cookiesWrapper.getCookie(key);
        return this.codeBooking;
    }

    saveCheckIn(codeChekIn: string, email: string) {
        let checkin: ICheckIn = {
          codeBooking: codeChekIn,
          email: email,
          date: null
        };
    }
}
