import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CheckInService } from './check-in.service';

describe('Check-In Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CheckInService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([CheckInService, XHRBackend], (service: MockBackend) => {
    expect(service).toBeTruthy();
  }));
});
