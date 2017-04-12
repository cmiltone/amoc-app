import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators }  from '@angular/forms';
import { HttpModule, Http }                 from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Order }                            from '../order';
import { Meal }                             from '../meal';
import { Restaurant }                       from '../restaurant';
import { MealItemService }                  from '../meal-item.service';

import { AddMealItemComponent }             from './add-meal-item.component';

describe('AddMealItemComponent', () => {
  let component: AddMealItemComponent;
  let fixture: ComponentFixture<AddMealItemComponent>;

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
    let meals: Meal[];
    let expectedRestaurant = "Jadina";
    let formControl = new FormControl('',Validators.required);
    let expectedForm = new FormGroup({
      selectedMeals: formControl
    });
    component.form = expectedForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
