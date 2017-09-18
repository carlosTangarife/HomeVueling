import { DatePickerComponent } from '../shared/components/date-picker/date-picker.component';
import { IndexSearchComponent } from './components/index-search/search-index.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { FlightComponent } from './components/flight/flight.component';
import { ListIconLinkComponent } from '../shared/components/list-icon-link/list-icon-link.component';
import { IconComponent } from '../shared/components/icon/icon.component';
import { PlacesComponent } from '../shared/components/places/places.component';
import { MinusPlusComponent } from '../shared/components/minus-plus/minus-plus.component';
import { TypePassengerComponent } from './components/passenger/type-passenger/type-passenger.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { DestinationSelectorComponent } from '../shared/components/destination-selector/destination-selector.component';
import { OriginSelectorComponent } from '../shared/components/origin-selector/origin-selector.component';
import { DiscountComponent } from './components/discount/discount.component';
import { DiscountListComponent } from './components/discount/discount-list/discount-list.component';
import { MulticityComponent } from './components/multicity/multicity.component';
import { CalendarOptionsComponent } from '../shared/components/calendar-options/calendar-options.component';

export const SEARCH_COMPONENTS = [
  IndexSearchComponent,
  CheckInComponent,
  ReservationComponent,
  FlightComponent,
  MulticityComponent,
  ListIconLinkComponent,
  IconComponent,
  PlacesComponent,
  CalendarComponent,
  PassengerComponent,
  TypePassengerComponent,
  DestinationSelectorComponent,
  OriginSelectorComponent,
  DiscountComponent,
  DiscountListComponent,
  MinusPlusComponent,
  DatePickerComponent,
  CalendarOptionsComponent
];
