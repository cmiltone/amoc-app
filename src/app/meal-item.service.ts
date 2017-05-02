import { Injectable } 	from '@angular/core';
import { HttpModule, Http }			from '@angular/http';
import { Observable } 	from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import { Meal }			from './meal';

@Injectable()
export class MealItemService {
	private mealsUrl = "../src/app/data/restaurant-meals.json";
	
	constructor(
		private http: Http
	) { }

	getMeals(restaurant: any):Observable<Meal[]>{
		return this.http
					.get(this.mealsUrl)
					.map((response) => response.json().filter(function(meal: Meal){
						return meal.restaurant == restaurant;
					}) as Meal[])
					.catch(error=>{
						console.error("Error occurerred!", error);
						return Observable.of<Meal[]>([]);
					});
	}
}
