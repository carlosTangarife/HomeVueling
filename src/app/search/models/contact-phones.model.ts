export interface IContactPhonesType {
    phonesSales: Array<IContactPhones>,
    phonesServices: Array<IContactPhones>
};

export interface IContactPhones {
    CountryCode: string,
    TextPhoneInfo: ITextPhoneInfo
}

export interface ICountryInfo {
  countryCode: string,
  name: string
}

export interface ITextPhoneInfo {
    phoneNumber: string,
    phoneInfoFirst: string,
    phoneInfoLast: string
}
