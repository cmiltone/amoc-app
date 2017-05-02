import { Injectable }				from '@angular/core';
import { Http, Response }			from '@angular/http';

import { Observable } 				from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Order }					from './order';


@Injectable()
export class OrdersService {
	private ordersUrl = "../src/app/data/orders.json";
	constructor(
		private http: Http
	){}
	getOrders(listType: string):Observable<Order[]>{
		return this.http
					.get(this.ordersUrl)
					.map((res) =>{
						if(res.ok){
							return res.json().filter(function(order: Order){
								return order.status == listType;
							}) as Order[];
						}else {
							return this.logError(res);
						}
					 
					})/**/
	}
	private logError(error: any){
		try{
			error = error.json();
			console.error(error.error);
		}catch(e){
			console.error(error)
		}
		return Observable.throw(error);
	}
}
