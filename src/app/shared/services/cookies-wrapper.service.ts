import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class CookiesWrapper {
    constructor(private _cookieService: CookieService) { }

    getCookie(key: string): any {
        return this._cookieService.getObject(key);
    }

    setCookie(key: string, data: any): void {
        this._cookieService.putObject(key, data);
    }

    removeCookie(key: string): void {
        this._cookieService.remove(key);
    }
}
