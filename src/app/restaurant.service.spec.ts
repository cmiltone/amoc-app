import { async, fakeAsync, TestBed, inject } from '@angular/core/testing';

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
  let search_term: string;
  beforeEach(async(() => {
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
    backend = TestBed.get(MockBackend);
    restaurantService = TestBed.get(RestaurantService);
  }));
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

  it('should create Injectable class `RestaurantService` for the service', inject([RestaurantService], (service: RestaurantService) => {
    expect(service).toBeTruthy();
  }));

  it('should have method #search_restaurant that return restaurants whose names start with the input search term from storage on success', (fakeAsync(()=>{
    search_term = 'Jadina';
    setupConnections(backend,{
      body: MockRestaurants,
      status: 200
    });
    restaurantService.search_restaurant(search_term)
      .subscribe(res =>{ 
        expect(res.length>0).toBe(true);
      });
  })));
  it('method #search_restaurant should log error on console on error', (fakeAsync(()=>{
    search_term = '';
    setupConnections(backend, {
      body: {
        error: "Error occurred!"
      },
      status: 500
    });
    restaurantService.search_restaurant(search_term)
      .subscribe(null, ()=>{
      expect(console.error).toHaveBeenCalledWith('Error occurred!');
    })
    spyOn(console, 'error');
  })));
});
