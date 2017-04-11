import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http }                             from '@angular/http';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';
import { MealOrderingComponent } from './meal-ordering.component';

describe('MealOrderingComponent Unit Test', () => {
  let component: MealOrderingComponent;
  let fixture: ComponentFixture<MealOrderingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpModule
      ],
      declarations: [ MealOrderingComponent ],
      providers: [ Http ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealOrderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
