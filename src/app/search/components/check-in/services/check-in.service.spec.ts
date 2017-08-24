import { TestBed, inject } from '@angular/core/testing';
import { CheckInService } from './check-in.service';

describe('Check-In Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckInService]
    });
  });

  it('should be created', inject([CheckInService], (service: CheckInService) => {
    expect(service).toBeTruthy();
  }));
});
