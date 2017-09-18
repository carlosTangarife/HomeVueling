import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-check-in-error]',
  templateUrl: './check-in-error.component.html'  
})
export class CheckInErrorComponent implements OnInit {
  public submit: boolean;
  
  constructor() {
    this.submit = false;
   }

  ngOnInit() {
  }

  onSubmit(){    
    this.submit = !this.submit;
  }

}
