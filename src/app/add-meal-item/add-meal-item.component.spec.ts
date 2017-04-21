import { async, ComponentFixture, fakeAsync, TestBed, } from '@angular/core/testing';
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    fixture.detectChanges();
  });
  it('should have an input `FormGroup`', ()=>{
    expect(component.form instanceof FormGroup).toBe(true);
  });
  it('should set and render component title as `2. Add Meal Items` in h3 tag', ()=>{
    expect(component.title).toEqual('2. Add Meal Items');
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('2. Add Meal Items');
  })
  it('should resolve meal items', fakeAsync(()=>{
    component.restaurant = expectedRestaurant;
    fixture.detectChanges();
    const spy = spyOn(mealItemService, 'getMeals').and.returnValue(
      Observable.of(testMeals)
    );
    component.meals = testMeals;
    fixture.detectChanges();
    expect(component.meals).toEqual(testMeals);
    fixture.whenStable().then(()=>{
      fixture.detectChanges();
      expect(spy.calls.any()).toEqual(true);
    });    
  }))
  it('should validate meals addition to order', ()=>{
    expect(component.form.valid).toBeFalsy();
  })
});
