import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  template: `
  <div id="form-group--dates" class="">
  <div class="col col-md-6">
    <label for="dates-input--from">Ida</label>
    <div class="input-group">
      <input type="text" id="dates-input--from" class="form-control js-searchbar-input js-searchbar-date-input"
             placeholder="DD/MM/YY"
             value="29/08/17"
             name="going"
             readonly="readonly"
      >
      <span class="icon icon-calendar"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
    </div>
  </div>
  <div class="col col-md-6">
    <label for="dates-input--to">Vuelta</label>
    <div class="input-group">
      <input type="text" id="dates-input--to" class="form-control js-searchbar-input js-searchbar-date-input"
             placeholder="DD/MM/YY"
             value="06/09/17"
             name="return"
             readonly="readonly"
      >
      <span class="icon icon-calendar"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
    </div>
  </div>
</div>
  `
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
