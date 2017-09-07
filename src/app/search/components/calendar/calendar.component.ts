import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-calendar]',
  template: `
    <div class="col col-md-6">
      <label>Ida</label>
      <div class="input-group">
        <input type="text" id="datepicker" class="form-control" placeholder="DD/MM/YY" readonly="readonly">
        <span class="icon icon-calendar"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
      </div>
    </div>
    <div class="col col-md-6">
      <a class="activate ">Añadir vuelta</a>
      <div class="date-range-to ">
        <label>Vuelta</label>
        <div class="input-group">
          <input type="text" id="datepicker" class="form-control" placeholder="DD/MM/YY" readonly="readonly">
          <span class="icon icon-calendar"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
        </div>
      </div>
    </div>`
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
