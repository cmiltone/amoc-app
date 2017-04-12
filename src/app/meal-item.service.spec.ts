import { TestBed, inject } from '@angular/core/testing';
import { HttpModule }	   from '@angular/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MealItemService } from './meal-item.service';

describe('MealItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      	HttpModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [MealItemService]
    });
  });

  it('should provide meal items data', inject([MealItemService], (service: MealItemService) => {
    expect(service).toBeTruthy();
  }));
});
