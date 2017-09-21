export interface IContactPhonesType {
    phonesSales: Array<IContactPhones>,
    phonesServices: Array<IContactPhones>
};

export interface IContactPhones {
    CountryCode: string,
    TextPhoneInfo: {
        phoneNumber: string,
        phoneInfoFirst: string,
        phoneInfoLast: string
     }
}
