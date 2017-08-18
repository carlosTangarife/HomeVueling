import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';



import { CheckInComponent } from './check-in.component';

import { CheckInService } from "./check-in.service";
import { Observable } from "rxjs/Observable";
import { HttpModule } from "@angular/http";
import { DebugElement } from "@angular/core";
import 'rxjs/Rx';


describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;
  let de: DebugElement;
  let checkService: CheckInService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ CheckInComponent ],
      providers: [CheckInService],
           
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;   
    de = fixture.debugElement;
    fixture.detectChanges();
    checkService = TestBed.get(CheckInService)
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it ('should set the service??', () => {
    spyOn(checkService, 'getCheckIn').and.returnValue(Observable.of('FAKE SERVICE'));
    fixture.detectChanges();
    const el = de.query(By.css('p')).nativeElement;
    expect(el.textContent).toEqual('FAKE SERVICE');
  });

 
});
