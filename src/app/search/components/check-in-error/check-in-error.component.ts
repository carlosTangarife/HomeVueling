import { ResourcesService } from './../../../shared/services/resources.service';
import { Component, OnInit } from '@angular/core';
import { IContactPhonesType, ITextPhoneInfo, ICountryInfo } from '../../models/contact-phones.model';
import { ConfigService } from '../../../shared/services/config.service';

@Component({
  selector: '[app-check-in-error]',
  templateUrl: './check-in-error.component.html'
})
export class CheckInErrorComponent implements OnInit {
  public countryInfo: Array<ICountryInfo>;
  public countryCode: string;
  public contactPhones: IContactPhonesType;
  public textPhoneInfo: ITextPhoneInfo;
  constructor(private resourcesService: ResourcesService ) {
    this.countryCode = 'ES';

    this.countryInfo = [
      {countryCode: 'DE', name: 'Alemania'},
      {countryCode: 'AU', name: 'Austria'},
      {countryCode: 'BE', name: 'Bélgica'},
      {countryCode: 'ES', name: 'España'},
      {countryCode: 'FR', name: 'Francia'},
      {countryCode: 'NL', name: 'Holanda'},
      {countryCode: 'IT', name: 'Italia'},
      {countryCode: 'PT', name: 'Portugal'},
      {countryCode: 'GB', name: 'Reino Unido'},
      {countryCode: 'RU', name: 'Rusia'},
      {countryCode: 'SW', name: 'Suiza'},
      {countryCode: 'WW', name: 'Resto del mundo'}
    ];
  }

  ngOnInit() {
    this.resourcesService.getContactPhones().subscribe((contactPhones) => {
      this.contactPhones = contactPhones;
    });
    this.showTextPhoneInfo();
  }

  showTextPhoneInfo() {
    this.textPhoneInfo = this.loadContactPhones(this.countryCode);
  }

  private loadContactPhones(country: string): ITextPhoneInfo {
    let contact = this.contactPhones.phonesServices.find(x => x.CountryCode === country);
    if (contact) {
      return {
              phoneNumber: contact.TextPhoneInfo.phoneNumber,
              phoneInfoFirst: contact.TextPhoneInfo.phoneInfoFirst,
              phoneInfoLast: contact.TextPhoneInfo.phoneInfoLast
        };
    }
    return null;
  }
}
