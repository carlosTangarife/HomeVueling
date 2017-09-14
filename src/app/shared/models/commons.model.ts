export interface IIconLink {
    IsEnabled: boolean,
    Label?: string,
    Link: string,
    Icon: IIcon
};

export interface IIcon {
    Class: string,
    Paths: number
}
