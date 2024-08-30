/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OperatingCountryService } from './operating-country.service';

describe('Service: OperatingCountry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperatingCountryService]
    });
  });

  it('should ...', inject([OperatingCountryService], (service: OperatingCountryService) => {
    expect(service).toBeTruthy();
  }));
});
