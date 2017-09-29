import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  isLoged(email: string): Observable<boolean> {
    const url = 'https://vueling-json.herokuapp.com/index.php/GetUserStatus/' + email;
    return this.http.get(url)
      .timeoutWith(5000, Observable.throw(new Error('Boom!')))
      .map((response) => response.json());
  }
}
