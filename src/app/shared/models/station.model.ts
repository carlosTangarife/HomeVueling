import { IIcon } from './commons.model';

export interface IStation {
    macCode?: string,
    name: string,
    code: string,
    countryCode?: string,
    countryName?: string,
    isRecent?: boolean,
    order?: number,
    icon?: IIcon
};

export interface IStationList {
    StationList: IStation[]
};

export interface IDestination {
    connection: boolean,
    largefamily: boolean,
    residents: boolean,
    destination: string
};

export interface IMarket extends IStation {
    connection: boolean,
    largefamily: boolean,
    residents: boolean
};
