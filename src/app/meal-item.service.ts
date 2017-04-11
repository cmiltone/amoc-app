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

	getMealItems():Observable<Meal[]>{
		return this.http
					.get(this.mealsUrl)
					.map(res => res.json().data as Meal[])/**/
	}
	getMeals(restaurant: any):Observable<Meal[]>{
		return this.http
					.get(this.mealsUrl)
					.map((response) => response.json().data as Meal[]);
	}
}
