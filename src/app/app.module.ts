import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }  from '@angular/router';

import { AppComponent } from './app.component';
import { MealOrderingComponent } from './meal-ordering/meal-ordering.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AddMealItemComponent } from './add-meal-item/add-meal-item.component';
import { AmocRoutingModule }    from './amoc-routing/amoc-routing.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MealOrderingComponent,
    OrderListComponent,
    AddMealItemComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    AmocRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
