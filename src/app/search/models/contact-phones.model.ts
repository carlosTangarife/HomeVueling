export interface IContactPhonesType {
    phonesSales: Array<IContactPhones>,
    phonesServices: Array<IContactPhones>
};

export interface IContactPhones {
    CountryCode: string,
    TextPhoneInfo: TextPhoneInfo
}

export interface TextPhoneInfo {
    phoneNumber: string,
    phoneInfoFirst: string,
    phoneInfoLast: string
}
