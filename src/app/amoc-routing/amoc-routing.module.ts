import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//components
import { MealOrderingComponent }	from '../meal-ordering/meal-ordering.component';
import { OrderListComponent }		from '../order-list/order-list.component';
//routes
const routes: Routes = [
	{path: '', redirectTo: '/', pathMatch: 'full'},
	{path: 'new_order', component: MealOrderingComponent},
	{path: 'my_orders', component: OrderListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AmocRoutingModule { }
