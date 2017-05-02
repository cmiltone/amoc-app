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
import { MockRestaurants }    from '../mocks';
import { MockMeals }        from '../mocks';

fdescribe('MealOrderingComponent:', () => {
  let restaurant_name: string = "Jadina";
  let testOrderForm_value = MockMeals[0];
  let component: MealOrderingComponent;
  let rs: RestaurantService;
  let fixture: ComponentFixture<MealOrderingComponent>;
  let formControl = new FormControl('',Validators.required);
  let expectedForm = new FormGroup({
      selectedMeals: formControl
  });

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
    const selectedFoods = testOrderForm_value;

    formControl = new FormControl(selectedFoods);
    component.form = new FormGroup({selectedMeals: formControl})
    fixture.detectChanges();
  });
  function filterRestaurants(restaurant: Restaurant){
    return restaurant.name = restaurant_name;
  }
  beforeEach(async(()=>{
    const searchRestaurant_spy = spyOn(component, 'searchRestaurant').and.callFake((term)=>{
      console.log("the string: "+term)
      component.searchTerms.next(term);
    })

    const search_restaurant_spy = spyOn(rs, 'search_restaurant').and.callFake((restaurant_name)=>{
      console.log("search")
      return Observable.of(MockRestaurants.filter(filterRestaurants));
    })
    fixture.detectChanges();
  }))
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
  fdescribe('searchRestaurant', ()=>{
    it("should return Subject stream of `searchTerms`", ()=>{
      //Arrange, act assert
      //let t = document.getElementById("restaurant_name");
      component.searchRestaurant('Ja');
      //tick();
      /*expect(component.searchRestaurant.c)*/
      //component.searchTerms.next('aas');
      component.searchTerms.subscribe(term=>{
        console.log('Inside sub:');
        console.log(term);
        expect(term).toBeFalsy();
      })
      component.restaurants
        .subscribe(name=> {console.log(name)});
    })
  })    
  it('should call method `searchRestaurant` each time user types a search term', ()=>{

  })
  it('should have property `restaurants` an Observable of restaurants whose names begin with the typed search terms', ()=>{

  })
  it('should list names of restaurants in the `restaurants` Observable', ()=>{

  })
  it('should have method `setRestaurant` to select restaurant', ()=>{

  })
  it('should have property `form` as FormGroup to submit and validate meal item(s)', ()=>{
    expect(component.form.valid).toBeFalsy();
  })
  it('should show `add-meal-item` element when `restaurant` is set', ()=>{

  })
  describe('placeOrder', ()=>{
    it('should create `order` with sumitted order form values',()=>{
      //component.form.value.selectedMeals = selectedFoods;
      expect(component.form.valid).toBeTruthy();
      //component.form.value = testOrderForm_value;
      component.placeOrder()
    })
  })
  
  it('should have method `confirmOrder` to set the `order` status to `Delivered`', ()=>{

  })
});
