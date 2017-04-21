import { async, ComponentFixture, TestBed }             from '@angular/core/testing';
import { HttpModule, Http }                             from '@angular/http';
import { ReactiveFormsModule, FormsModule }             from '@angular/forms';
import { FormGroup, FormControl, Validators }           from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA }     from '@angular/core';
import { MealOrderingComponent }                        from './meal-ordering.component';

describe('MealOrderingComponent Unit Tests', () => {
  let component: MealOrderingComponent;
  let fixture: ComponentFixture<MealOrderingComponent>;

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
    let formControl = new FormControl('',Validators.required);
    let form = new FormGroup({
      selectedMeals: formControl
    });
    component.form = form;
    fixture.detectChanges();
  });
  it('form invalid when empty', ()=>{
    expect(component.form.valid).toBeFalsy();
  })
  it('')
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
