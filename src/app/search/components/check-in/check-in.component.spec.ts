import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

import { CheckInComponent } from './check-in.component';
// Modules for services
import { Observable } from "rxjs/Observable";
import { HttpModule } from "@angular/http";
import { DebugElement } from "@angular/core";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import 'rxjs/Rx';

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;
  let de: DebugElement;
  //let checkService: CheckInService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInComponent ],
      imports: [HttpModule],
      schemas: [NO_ERRORS_SCHEMA]
      //providers: [CheckInService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
    //checkService = TestBed.get(CheckInService)
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it ('should initialized the flagEmail in true', () => {
      component.isEmail();
      expect(component.flag).toBeTruthy;
  });

  it ('The flagCheckin should be false if condition no apply', () => {
      debugger;     
      component.ngOnInit();
      expect(component.flagCheckIn == false).toBeTruthy();
  });
  
  it ('should be true if the condition apply', () => {
    debugger;    
    component.ngOnInit();       
    expect(component.flagCheckIn == true).toBeFalsy();
  });

  it ('should be negative', () => {
      expect(component.isOrigin()).toBeFalsy();
  });

  
  /*it ('should set the service?? - test ', () => {
    spyOn(checkService, 'getCheckIn').and.returnValue(Observable.of('FAKE SERVICE'));
    fixture.detectChanges();
    const el = de.query(By.css('p')).nativeElement;
    expect(el.textContent).toEqual('FAKE SERVICE');
  });*/

});


