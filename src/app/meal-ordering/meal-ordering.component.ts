import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators }	from '@angular/forms';

import { Restaurant }							from '../restaurant';
import { Order }								from '../order';

import { MealItemService }						from '../meal-item.service';
import { RestaurantService }					from '../restaurant.service';

import { Observable }							from 'rxjs/Observable';
import { Subject }								from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-meal-ordering',
  templateUrl: './meal-ordering.component.html',
  styleUrls: ['./meal-ordering.component.css'],
  providers: [
  	RestaurantService
  ]
})

export class MealOrderingComponent implements OnInit{
	title: string;
	form: FormGroup;
	order: Order;
	payLoad: any;

	restaurant: string;
	restaurants: Observable<Restaurant[]>;
	searchTerms = new Subject<string>();
	constructor(
		private rs: RestaurantService
	){}
	ngOnInit(){
		this.form = new FormGroup({
			selectedMeals: new FormControl('', [Validators.required])
		});

		this.title = "Meal Ordering";
		this.restaurants = this.searchTerms
			.debounceTime(300)
			.distinctUntilChanged()
			.switchMap(term => term 
				?this.rs.search(term)
				: Observable.of<Restaurant[]>([]))
			.catch(error=>{
				console.log(error);
				return Observable.of<Restaurant[]>([]);
			});
	}
	searchRestaurant(term: string){
		this.searchTerms.next(term);
	}
	setRestaurant(restaurant: string){
		this.restaurant = restaurant;
	}
	placeOrder(): void{
		const timestamp = Date.now();
		this.order = {
			id: timestamp,
			date: new Date(timestamp).toString(),
			status: "Finalized",
			cost: this.form.value.selectedMeals[0].price,
			items: this.form.value.selectedMeals
		};
		this.title = "Order Made Successfully";
	}
	confirmOrder(){
		console.log("confirm");
		this.order.status = "Ordered";
		this.title = "Order Confirmed and sent Successfully. Please Note the order number";
		this.payLoad = JSON.stringify(this.order);
		console.log(this.payLoad);
	}
}
