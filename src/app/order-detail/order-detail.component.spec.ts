import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';

import { OrderDetailComponent } from './order-detail.component';
import { OrdersService }        from '../orders.service';
import { Order }                from '../order';
import { Meal }                 from '../meal';
import { MockOrders }           from '../mocks';


fdescribe('OrderDetailComponent Unit Tests', () => {
  let order: Order  = MockOrders[1];
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;
  let de: any;
  let el: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    component.order = order;
    de = fixture.debugElement.query(By.css('.detailitem'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display passed in order`s detail', ()=>{
    expect(component.order).toBeTruthy();
    expect(el.textContent).toBeTruthy();
  });
  it('#updateOrder should update order status to `Delivered` when confirm button is clicked', ()=>{
    component.updateOrder('Delivered');
    fixture.detectChanges();
    expect(component.order.status).toBe('Delivered');
  })
});
