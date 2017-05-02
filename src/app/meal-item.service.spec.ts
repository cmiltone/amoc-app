import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpModule }	   from '@angular/http';
import { 
 BaseRequestOptions,
 Http,
 Response,
 ResponseOptions,
 XHRBackend
} from '@angular/http';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MealItemService } from './meal-item.service';
import { Meal } from './meal';
import { MockMeals } from './mocks';


describe('MealItemService', () => {
  let mealItemService: MealItemService;
  let input_restaurant: string = 'Jadina';
  let backend: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      	HttpModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        MealItemService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions)=>{
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });
    backend = TestBed.get(MockBackend);
    mealItemService = TestBed.get(MealItemService);
  });
  function setupConnections(backend: MockBackend, options: any){
    backend.connections.subscribe((connection: MockConnection)=>{
      if(connection.request.url==='../src/app/data/restaurant-meals.json'){
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);

        connection.mockRespond(response);
      }
    })
  }

  it('should create Injectable `MealItemService` service', inject([MealItemService], (service: MealItemService) => {
    expect(service).toBeTruthy();
  }));
  it('should get meals from server and return on succes', ()=>{
    setupConnections(backend, {
      body: MockMeals,
      status: 200
    });
    mealItemService.getMeals(input_restaurant)
            .subscribe((res) =>{ 
              //expect(res.length>0).toBe(true);
            });
  });
  it('should log error on console on error', ()=>{
    setupConnections(backend, {
      body: {
        error: "Error occurred!"
      },
      status: 500
    });
    spyOn(console, 'error');
    mealItemService.getMeals(input_restaurant)
      .subscribe(null, ()=>{
      expect(console.error).toHaveBeenCalledWith('Error occurred!');
    })
  });
});
