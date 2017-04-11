import { Component, OnInit, Input }				from '@angular/core';
import { Router }								from '@angular/router';
import { FormGroup, FormControl, Validators }	from '@angular/forms';
import { Location }								from "@angular/common";

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

	private title: string;
	@Input() restaurant: string;
	@Input() form: FormGroup;

	private meals: Meal[];
	constructor(
		private location: Location,
		private mis: MealItemService,
		private router: Router
	){}
	ngOnInit(){
		console.log(this.form);
		this.title = "2. Add Meal Items";
		this.mis.getMeals(this.restaurant)
				.subscribe(res=> {
					const rest = this.restaurant;					 
					this.meals = res.filter(function(meal: Meal){
						return meal.restaurant == rest;
					});
				});
		}

}
