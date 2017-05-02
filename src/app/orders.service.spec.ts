import { async, getTestBed, TestBed, inject } from '@angular/core/testing';

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

import { Order } from './order';
import { MockOrders } from './mocks';
import { OrdersService } from './orders.service';

describe('OrdersService: ', () => {
  let backend: MockBackend;
  let ordersService: OrdersService;
  let type: string;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions)=>{
            return new Http(backend, defaultOptions);
          }
        }
       ]
    });
    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    ordersService = testbed.get(OrdersService);
  }));
  
  function setupConnections(backend: MockBackend, options: any){
    backend.connections.subscribe((connection: MockConnection)=>{
      if(connection.request.url==="../src/app/data/orders.json"){
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);
        
        connection.mockRespond(response);
      }
    })
  }
  it('should create Injectable `OrdersService` class', inject([OrdersService], (service: OrdersService) => {
    expect(service).toBeTruthy();
  }));
  describe('getOrders', ()=>{
    it('should return Archived orders when passed in `Delivered`', ()=>{
      setupConnections(backend, {
        body: MockOrders,
        status: 200
      });
      type = 'Delivered';
      ordersService.getOrders(type)
            .subscribe((MockOrders: Order[]) =>{
              expect(MockOrders.length>1).toBe(true);
              expect(MockOrders[0].status == 'Delivered').toBe(true);
            })
    });
    it('should return Active orders when passed in `Ordered`', ()=>{
      setupConnections(backend, {
        body: MockOrders,
        status: 200
      });
      type = 'Ordered';
      ordersService.getOrders(type)
            .subscribe((MockOrders: Order[]) =>{
              expect(MockOrders.length>1).toBe(true);
              expect(MockOrders[0].status == 'Delivered').toBe(true);
            })
    });
    it('should log error on console on error', ()=>{
      type = 'Ordered';
      setupConnections(backend, {
        body: {
          error: "Error occurred!"
        },
        status: 500
      });
      spyOn(console, 'error');
      ordersService.getOrders(type)
        .subscribe(null, ()=>{
        expect(console.error).toHaveBeenCalledWith('Error occurred!');
      })
    });
  })
});
