import { IndexSearchComponent } from './components/index-search/search-index.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { FlightComponent } from './components/flight/flight.component';
import { PlacesComponent } from '../shared/components/places/places.component';
import { StationsComponent } from '../shared/components/stations/stations.component';
import { TypePassengerComponent } from './components/passenger/type-passenger/type-passenger.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PassengerComponent } from './components/passenger/passenger.component';

export const SEARCH_COMPONENTS = [
  IndexSearchComponent,
  CheckInComponent,
  ReservationComponent,
  FlightComponent,
  PlacesComponent,
  StationsComponent,
  CalendarComponent,
  PassengerComponent,
  TypePassengerComponent
];
