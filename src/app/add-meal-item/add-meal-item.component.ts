import { Component, OnInit, Input }				from '@angular/core';
import { FormGroup, FormControl }	from '@angular/forms';

import { Order }								from '../order';
import { Meal }									from '../meal';
import { Restaurant }							from '../restaurant';

import { MealItemService }						from '../meal-item.service';



@Component({
	selector: 'app-add-meal-item',
	templateUrl: './add-meal-item.component.html',
	styleUrls: ['./add-meal-item.component.css'],
	providers: [
		MealItemService
	]
})
export class AddMealItemComponent implements OnInit {

	title: string = "2. Add Meal Items";
	@Input() restaurant: string;
	@Input() form: FormGroup;

	meals: Meal[];
	constructor(
		private mealItemsService: MealItemService
	){}
	ngOnInit(){
		this.mealItemsService.getMeals(this.restaurant)
				.subscribe(res=>this.meals = res);/**/
	}
}
