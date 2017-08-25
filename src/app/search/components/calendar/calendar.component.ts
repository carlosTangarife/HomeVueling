import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  template: `
    <div class="form-input">
    <label for="usr">Fechas</label>
    <div class="input-group">
      <input type="text" id="destination-input" class="form-control js-searchbar-input" placeholder="Ciudad, país o aeropuerto">
    </div>
  </div>
  `
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
