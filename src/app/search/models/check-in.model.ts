export interface ICheckIn {
    codeBooking?: string,
    email?: string,
    date?: Date,
    originOrDestinationCode?: string,
    originOrDestinationName?: string,
    checkInWithEmail?: boolean,
    checkInWithOriginDestination?: boolean
}
