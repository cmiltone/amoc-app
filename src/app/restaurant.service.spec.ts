import { TestBed, inject } from '@angular/core/testing';

import { HttpModule }	   from '@angular/http';

import { RestaurantService } from './restaurant.service';

describe('RestaurantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      	HttpModule
      ],
      providers: [RestaurantService]
    });
  });

  it('should ...', inject([RestaurantService], (service: RestaurantService) => {
    expect(service).toBeTruthy();
  }));
});
