import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { StationService } from './station.service';
import { IStation, IMarket, IStationList } from '../../search/components/flight/flight.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class StationsSelectorService {
  public stations: IStationList;
  public markets: any;
  public marketsIata: IMarket[];

  constructor(private _configService: ConfigService, private _stationService: StationService) {
    this.stations = this._configService.environment['stations'];
    this.markets = this._configService.environment['markets'];
  }
}
