import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';

import { OrderDetailComponent } from './order-detail.component';
import { OrdersService }        from '../orders.service';
import { Order }                from '../order';
import { Meal }                 from '../meal';


describe('OrderDetailComponent Unit Tests', () => {
  let order: Order;
  order = {
    id: 1312124124,
    date: "12-04-2017",
    status: "Delivered",
    cost: 1000,
    items: [
      {
        id: 121212,
        name: "Fish Fry",
        price: 5000,
        category: "Stew",
        restaurant: "Jadina",
        imageUrls: [
          "image1.jpg"
        ],
      }
    ]
  };
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;
  let de: any;
  let el: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailComponent ],
      providers: [

      ]
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
});
