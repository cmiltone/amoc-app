import { Component, OnInit, Input } from '@angular/core';
import { OrdersService }							from '../orders.service';
import { Location }								from '@angular/common';
import { Order }								from '../order';

@Component({
	selector: 'order-detail',
	templateUrl: './order-detail.component.html',
	styleUrls: ['order-detail.component.css'],
	providers: [ ]
})

export class OrderDetailComponent {
	
	@Input()order: Order;
	constructor(
		private location: Location
	){}

	ngOnInit(){
		console.log(this.order);
	}
	updateOrder(status: string){
		//update order status e.g delivered, cancelled, finalized etc
		console.log(status);
		this.order.status = status;
		//TODO: backend to save update on database
	}
}