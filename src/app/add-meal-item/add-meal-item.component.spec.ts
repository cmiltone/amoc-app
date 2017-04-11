import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, Http }                 from '@angular/http';
import { RouterTestingModule }              from '@angular/router/testing';

import { Location }                         from "@angular/common";

import { Order }                            from '../order';
import { Meal }                             from '../meal';
import { Restaurant }                       from '../restaurant';

import { AddMealItemComponent }             from './add-meal-item.component';

describe('AddMealItemComponent', () => {
  let component: AddMealItemComponent;
  let fixture: ComponentFixture<AddMealItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ AddMealItemComponent ],
      providers: [ Location ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMealItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
