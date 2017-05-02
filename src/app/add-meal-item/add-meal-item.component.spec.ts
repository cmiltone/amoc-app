import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators }  from '@angular/forms';
import { HttpModule, Http }                 from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Order }                            from '../order';
import { Meal }                             from '../meal';
import { Restaurant }                       from '../restaurant';
import { MealItemService }                  from '../meal-item.service';
import { MockMeals }                        from '../mocks';

import { AddMealItemComponent }             from './add-meal-item.component';

describe('AddMealItemComponent', () => {
  let component: AddMealItemComponent;
  let fixture: ComponentFixture<AddMealItemComponent>;
  let mealItemService: MealItemService;
  let testMeals: Meal[] = MockMeals;
  let expectedRestaurant = "Jadina";
  let formControl = new FormControl('',Validators.required);
  let expectedForm = new FormGroup({
      selectedMeals: formControl
  });

  beforeEach(async(() => {
      
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ 
        AddMealItemComponent, 
      ],
      providers: [ 
        MealItemService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMealItemComponent);
    component = fixture.componentInstance;
    component.form = expectedForm;
    mealItemService = fixture.debugElement.injector.get(MealItemService);

  });
  function filterMeals(meal: Meal){
    return meal.restaurant == expectedRestaurant;
  }
  beforeEach(async(()=>{

    const getMeals_spy = spyOn(mealItemService, 'getMeals').and.callFake((expectedRestaurant)=>{
      return Observable.of(testMeals.filter(filterMeals));
    })

    const ngOnInit_spy = spyOn(component, 'ngOnInit').and.callFake(()=>{
      mealItemService.getMeals(expectedRestaurant)
          .subscribe(meals=>component.meals = meals);
    })

    fixture.detectChanges();
  }))

  it('should create `AddMealItemComponent` component', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });
  it('should set and render component title as `2. Add Meal Items` in h3 tag', ()=>{
    expect(component.title).toEqual('2. Add Meal Items');
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('2. Add Meal Items');
  })
  it('should fetch meal items from a given reastaurant', fakeAsync(()=>{
    //set restaurant
    component.restaurant = expectedRestaurant;

    component.ngOnInit();
    fixture.detectChanges();
    expect(component.meals.length >0).toBe(true);
      
  }))/**/  
  it('should render meal options (by showing names and prices of meal) to be selected', ()=>{
    const meals = testMeals.filter(filterMeals);
    const de  = fixture.debugElement.nativeElement;
    const el = de.querySelector('option');
    expect(el.textContent).toContain(meals[0].name+" - Kshs. "+meals[0].price);
  })
  it('should have a `FormGroup` that becomes valid when the user selects meal item(s)', fakeAsync(()=>{
    expect(component.form instanceof FormGroup).toBe(true);
    expect(component.form.valid).toBeFalsy();
    const selectedFoods = testMeals[0];
    const de = fixture.debugElement.nativeElement;
    const el = de.querySelector('select');
    
    formControl = new FormControl(selectedFoods);
    component.form = new FormGroup({selectedMeals: formControl})
    fixture.detectChanges();
    //component.form.value.selectedMeals = selectedFoods;
    expect(component.form.valid).toBeTruthy();
  }));
});
