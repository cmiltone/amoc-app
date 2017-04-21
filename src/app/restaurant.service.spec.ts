import { TestBed, inject } from '@angular/core/testing';

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

import { Restaurant } from './restaurant';
import { MockRestaurants } from './mocks';
import { RestaurantService } from './restaurant.service';

describe('RestaurantService', () => {
  let backend: MockBackend;
  let restaurantService: RestaurantService;
  let restaurant: Restaurant = MockRestaurants[0];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      	HttpModule
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        RestaurantService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions)=>{
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });
  function setupConnections(backend: MockBackend, options: any){
    backend.connections.subscribe((connection: MockConnection)=>{
      if(connection.request.url==='../src/app/data/restaurants.json'){
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);

        connection.mockRespond(response);
      }
    })
  }

  it('should provide restaurant data', inject([RestaurantService], (service: RestaurantService) => {
    expect(service).toBeTruthy();
  }));

  it('should get restaurants from server and return on succes', ()=>{
    backend = TestBed.get(MockBackend);
    restaurantService = TestBed.get(RestaurantService);
    setupConnections(backend,{
      body: MockRestaurants,
      status: 200
    });
    restaurantService.search(restaurant)
            .subscribe((res: Restaurant[]) =>{ 
              expect(res).toBe(undefined);
            });
  });
  it('should log error on console on error', ()=>{
    backend = TestBed.get(MockBackend);
    restaurantService = TestBed.get(RestaurantService);
    setupConnections(backend, {
      body: {
        error: "Error occurred!"
      },
      status: 500
    });
    spyOn(console, 'error');
    restaurantService.search(restaurant)
      .subscribe(null, ()=>{
      expect(console.error).toHaveBeenCalledWith('Error occurred!');
    })
  });
});
