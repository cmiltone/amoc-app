import { TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MealItemService } from './meal-item.service';

describe('MealItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [MealItemService]
    });
  });

  it('should ...', inject([MealItemService], (service: MealItemService) => {
    expect(service).toBeTruthy();
  }));
});
