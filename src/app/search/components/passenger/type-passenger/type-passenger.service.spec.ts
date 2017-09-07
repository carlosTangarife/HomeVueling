import { TestBed, inject } from '@angular/core/testing';

import { TypePassengerService } from './type-passenger.service';

describe('TypePassengerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypePassengerService]
    });
  });

  it('should be created', inject([TypePassengerService], (service: TypePassengerService) => {
    expect(service).toBeTruthy();
  }));
});
