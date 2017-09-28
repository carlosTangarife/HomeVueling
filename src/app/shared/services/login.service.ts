import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  isLoged(email: string): boolean {
    const url = 'https://vueling-json.herokuapp.com/index.php/GetUserStatus/' + email;
    let isLoged: boolean;
    this.http.get(url).map((response) => response.json()).subscribe((response) => isLoged = response);
    return isLoged;
  }
}
