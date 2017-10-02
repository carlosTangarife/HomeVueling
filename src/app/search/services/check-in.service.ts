import { Injectable } from '@angular/core';

import { ICheckIn } from '../models/check-in.model';

import { CookiesWrapper } from '../../shared/services/cookies-wrapper.service';
import { ResourcesService } from './../../shared/services/resources.service';

@Injectable()
export class CheckInService {
    public environment: Object;
    public codeBooking: string;
    public key: string;

    constructor(private _cookiesWrapper: CookiesWrapper, private resourcesService: ResourcesService) {
      this.environment = {};
      this.codeBooking = '';
      this.key = '';
    }

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

    getContactPhones() {
      let loadContactPhones = this.resourcesService.getContactPhones().map(res => (this.environment['contactphones'] = res)).share();
    }
}
