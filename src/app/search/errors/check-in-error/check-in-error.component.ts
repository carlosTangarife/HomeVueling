import { Component, OnInit } from '@angular/core';
import { IContactPhones } from '../../models/contact-phones.model';
import { ConfigService } from '../../../shared/services/config.service';
import { SelectorService } from '../../../shared/services/selector.service';

@Component({
  selector: '[app-check-in-error]',
  templateUrl: './check-in-error.component.html'
})
export class CheckInErrorComponent implements OnInit {
  public submit: boolean;
  public countryInfo: Array<Object>;
  public countryCode: string;
  public result: IContactPhones;

  constructor(public selectorService: SelectorService) {

    this.countryCode = 'ES';
    this.submit = false;
    this.countryInfo = [
      {countryCode: "DE", name: "Alemania"},
      {countryCode: "AU", name: "Austria"},
      {countryCode: "BE", name: "Bélgica"},
      {countryCode: "ES", name: "España"},
      {countryCode: "FR", name: "Francia"},
      {countryCode: "NL", name: "Holanda"},
      {countryCode: "IT", name: "Italia"},
      {countryCode: "PT", name: "Portugal"},
      {countryCode: "GB", name: "Reino Unido"},
      {countryCode: "RU", name: "Rusia"},
      {countryCode: "SW", name: "Suiza"},
      {countryCode: "WW", name: "Resto del mundo"}
    ];

   }

  ngOnInit() {
    this.selectorService.loadContactPhones(this.countryCode);
  }

  onSubmit() {
    this.submit = !this.submit;
  }

  onChange() {
     this.result = this.selectorService.loadContactPhones(this.countryCode);
  }
}


