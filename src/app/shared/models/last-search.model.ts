export interface StationSelected {
    iataCode: string;
    date: Date;
}

export interface LastStationsSelected {
    lastStationsSelected: Array<StationSelected>;
}
