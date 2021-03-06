import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
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

describe('OrderListComponent:', () => {
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
    component.listType = 'Ordered';
    de = fixture.debugElement.query(By.css('.listitem'));
    //el = de.nativeElement;

    function filterOrders(order: Order){
      return order.status == component.listType;
    }
    const getOrders_spy = spyOn(ordersService, 'getOrders').and.callFake((type)=>{
      return Observable.of(testOrders.filter(filterOrders));
    });
    const loadOrders_spy = spyOn(component, 'loadOrders').and.callFake((type)=>{
      component.title = `Showing `+component.listType+` Orders`;
      ordersService.getOrders(component.listType)
        .subscribe(res=> component.orders = res)/**/
    })
    const ngOnInit_spy = spyOn(component, 'ngOnInit').and.callFake(()=>{
      component.loadOrders(component.listType);
    })
    fixture.detectChanges();
  });
  /*beforeEach(async(()=>{
    fixture.detectChanges();
  }))*/
  it('should create `OrdersListComponent`', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });
  it('should fetch orders of given type', fakeAsync(()=>{
    component.ngOnInit();
    expect(component.orders).toBeTruthy();
  }));
  it('It shoud render order`s list', ()=>{    
    fixture.detectChanges();
    let order = component.orders[0];
    const compiled = fixture.debugElement.nativeElement;
    let el = compiled.querySelector('span');
    expect(el.textContent).toContain(order.id);
  });
});
