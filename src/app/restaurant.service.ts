import { Injectable }			from '@angular/core';
import { Http }	from '@angular/http';

import { Restaurant }			from './restaurant';

import { Observable } 			from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestaurantService {
	private restaurantUrl = "../src/app/data/restaurants.json";
	constructor(private http: Http){}
	search_restaurant(restaurant_name: string):Observable<Restaurant[]>{
		console.log(restaurant_name);
		return this.http
					.get(this.restaurantUrl)
					.map(res=> res.json().filter((restaurant: Restaurant)=>{
							return restaurant.name.startsWith(restaurant_name);
					}) as Restaurant[])
					.catch(error=>{
						console.error("Error occurerred!", error);
						return Observable.of<Restaurant[]>([]);
					});
	}
}