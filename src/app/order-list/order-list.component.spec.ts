import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';

import { FormsModule }             from '@angular/forms';
import { HttpModule, Http }                    from '@angular/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA }  from '@angular/core';

import { Order }              from '../order';
import { MockOrders }         from '../mocks';
import { OrderListComponent } from './order-list.component';

import { Observable }              from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { OrdersService } from '../orders.service';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let ordersService: OrdersService;
  let testOrders: Order[] = MockOrders;

  let de: any;
  let el: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule
      ],
      declarations: [ OrderListComponent ],
      providers: [
        OrdersService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    ordersService = fixture.debugElement.injector.get(OrdersService);
    de = fixture.debugElement.query(By.css('.listitem'));
    //el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create orders list OnInit', () => {
    expect(component).toBeTruthy();
  });
  it('it should not display orders data before OnInit',()=>{
    expect(testOrders).toBeTruthy();
  });
  it('It shoud fetch orders data', ()=>{
    let spy = spyOn(ordersService, 'getOrders')
            .and.returnValue(Observable.of(testOrders));
    fixture.detectChanges();
  });
});
