import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CheckInService {
    constructor(private http: Http) { }

    getCheckIn(): Observable<any> {
        return this.http.get('https://demo6703574.mockable.io/apitest')
            .map(response => response.json().value.code);
    }
}
