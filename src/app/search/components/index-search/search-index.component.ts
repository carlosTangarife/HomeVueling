import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '../../../shared/services/config.service';

@Component({
  selector: 'app-index-search',
  templateUrl: './search-index.component.html'
})
export class IndexSearchComponent implements OnInit {

  isFlight: boolean;
  ischeckIn: boolean;
  isOverlay: boolean;
  searcherConfig: any;
  isReservation: boolean;

  constructor(private _configService: ConfigService) {
    this.searcherConfig = this._configService.environment['configuration'];
  }

  ngOnInit() {
    this.isFlight = true;
    this.ischeckIn = false;
    this.isReservation = false;
    this.isOverlay = false;
  }

  stateTag(isFlight: boolean, ischeckIn: boolean, isReservation: boolean) {
    this.isFlight = isFlight;
    this.ischeckIn = ischeckIn;
    this.isReservation = isReservation;
  }

  toggleClassOverlay() {
    this.isOverlay = !this.isOverlay;
  }

  showOverlay() {
    this.isOverlay = true;
  }

  hideOverlay() {
    this.isOverlay = false;
  }
}
