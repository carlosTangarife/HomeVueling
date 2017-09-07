import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../shared/services/config.service';

@Component({
  selector: 'app-index-search',
  templateUrl: './search-index.component.html'
})
export class IndexSearchComponent implements OnInit {
  searcherConfig: any;
  isFlight: boolean;
  ischeckIn: boolean;
  isReservation: boolean;
  showOverlay: boolean;

  constructor(private _configService: ConfigService) {
    this.searcherConfig = this._configService.environment['configuration'];
  }

  ngOnInit() {
    this.isFlight = true;
    this.ischeckIn = false;
    this.isReservation = false;
    this.showOverlay = false;
  }

  stateTag(isFlight: boolean, ischeckIn: boolean, isReservation: boolean) {
    this.isFlight = isFlight;
    this.ischeckIn = ischeckIn;
    this.isReservation = isReservation;
  }

  toggleClassOverlay() {
      this.showOverlay = !this.showOverlay;
  }

}
