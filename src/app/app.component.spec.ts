import { TestBed, async, fakeAsync, tick }  from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA }  from '@angular/core';
import { RouterTestingModule }              from '@angular/router/testing';
import { Router, Routes }                   from '@angular/router';
import { Location }                         from '@angular/common';

import { AppComponent } from './app.component';

//components
import { MealOrderingComponent } from './meal-ordering/meal-ordering.component';
import { OrderListComponent }    from './order-list/order-list.component';

//routes

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'new_order', component: MealOrderingComponent},
  {path: 'my_orders', component: OrderListComponent}
];


describe('AppComponent', () => {
  let location: Location;
  let router:  Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        AppComponent,
        MealOrderingComponent,
        OrderListComponent
      ],
    }).compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  }));
  
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Ampath Meal Ordering App'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Ampath Meal Ordering App');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Ampath Meal Ordering App');
  }));
  
  it("should redirect to / when user navigates to '' ", fakeAsync(()=>{
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/');
  }));
});
