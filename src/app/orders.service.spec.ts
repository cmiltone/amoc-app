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

import { Order } from './order';
import { MockOrders } from './mocks';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {

  let backend: MockBackend;
  let ordersService: OrdersService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      	HttpModule
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        OrdersService,
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
  function setupConnections(backend: MockBackend, options: any){
    backend.connections.subscribe((connection: MockConnection)=>{
      if(connection.request.url==='../src/app/data/orders.json'){
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);

        connection.mockRespond(response);
      }
    })
  }
  it('should create', inject([OrdersService], (service: OrdersService) => {
    expect(service).toBeTruthy();
  }));
  it('should get orders from server and return on succes', ()=>{
    backend = TestBed.get(MockBackend);
    ordersService = TestBed.get(OrdersService);
    setupConnections(backend, {
      body: MockOrders,
      status: 200
    });
    ordersService.getOrders()
            .map((res) =>{ 
              expect(res.length).toBe(1);
            });
  });
  it('should log error on console on error', ()=>{
    backend = TestBed.get(MockBackend);
    ordersService = TestBed.get(OrdersService);
    setupConnections(backend, {
      body: {
        error: "Error occurred!"
      },
      status: 500
    });
    spyOn(console, 'error');
    ordersService.getOrders()
      .subscribe(null, ()=>{
      expect(console.error).toHaveBeenCalledWith('Error occurred!');
    })
  });
});
