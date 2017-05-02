import { async, fakeAsync, ComponentFixture, TestBed, tick }             from '@angular/core/testing';
import { HttpModule, Http }                             from '@angular/http';
import { ReactiveFormsModule, FormsModule }             from '@angular/forms';
import { FormGroup, FormControl, Validators }           from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA }     from '@angular/core';
import { MealOrderingComponent }                        from './meal-ordering.component';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import { RestaurantService } from '../restaurant.service';
import { Restaurant }        from '../restaurant';
import { Order }             from '../order';
import { MockRestaurants }    from '../mocks';
import { MockMeals }        from '../mocks';

fdescribe('MealOrderingComponent:', () => {
  let restaurant_name: string = "Jadina";
  let test_meal = MockMeals[0];
  let component: MealOrderingComponent;
  let rs: RestaurantService;
  let fixture: ComponentFixture<MealOrderingComponent>;
  let formControl = new FormControl('',Validators.required);
  let expectedForm = new FormGroup({
      selectedMeals: formControl
  });
  const timestamp = Date.now();
  let testOrder: Order = {
    id: timestamp,
    date: new Date(timestamp).toString(),
    status: "Finalized",
    cost: test_meal.price,
    items: MockMeals
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [ MealOrderingComponent ],
      providers: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(MealOrderingComponent);
    component = fixture.componentInstance;
    rs = fixture.debugElement.injector.get(RestaurantService);
    let formControl = new FormControl('',Validators.required);
    let form = new FormGroup({
      selectedMeals: formControl
    });
    component.form = form;
    const selectedFoods = test_meal;

    let searchRestaurant_spy = spyOn(component, 'searchRestaurant').and.callFake((term)=>{
      console.log("the string: "+term)
      component.searchTerms.next(term);
    });

    let search_restaurant_spy = spyOn(rs, 'search_restaurant').and.callFake((restaurant_name)=>{
      console.log("search")
      return Observable.of(MockRestaurants.filter(filterRestaurants));
    });

    fixture.detectChanges();
  });
  function filterRestaurants(restaurant: Restaurant){
    return restaurant.name = restaurant_name;
  }
  /*beforeEach(async(()=>{    fixture.detectChanges();
  }))*/
  it('should create `MealOrderingComponent` component', () => {
    expect(component).toBeTruthy();
  });
  it('should have as title `Meal Ordering`', ()=>{
    expect(component.title).toEqual('Meal Ordering');    
  })
  it('should render title in a h2 tag', () => {
    const fixture = TestBed.createComponent(MealOrderingComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Meal Ordering');
  })
  describe('searchRestaurant', ()=>{
    it("should return Subject stream of `searchTerms` when user types", async(()=>{
      component.ngOnInit();
      //Arrange, act assert
      component.searchRestaurant('Jadina');
      component.searchTerms.subscribe(term=>{
        console.log(term);
        expect(term).toBeTruthy();
      })/**/
      component.restaurants
        .subscribe(name=> {console.log(name)});
    }))
  })    
  it('should have property `form` as FormGroup invalid when empty', ()=>{
    expect(component.form.valid).toBeFalsy();
  })
  describe('placeOrder', ()=>{
    it('should set `order` details with sumitted order form values',()=>{
      let selected_meals = component.form.controls.selectedMeals;
      selected_meals.setValue(test_meal);
      let v = component.form.value;
      component.placeOrder(v);
      expect(component.order).toBeTruthy();
    })
  })
  describe('confirmOrder', ()=>{
    it('should change order status to `Ordered`', ()=>{
      component.order = testOrder;
      component.confirmOrder();
      expect(component.order.status).toEqual('Ordered');
    })
    it('should change title to `Order Confirmed and sent Successfully. Please Note the order number`', ()=>{
      component.order = testOrder;
      component.confirmOrder();
      expect(component.title).toEqual('Order Confirmed and sent Successfully. Please Note the order number');
    })
    it('should set payLoad', ()=>{
      component.order = testOrder;
      component.confirmOrder();
      expect(component.payLoad).toEqual(JSON.stringify(component.order));
    })
  })
});
