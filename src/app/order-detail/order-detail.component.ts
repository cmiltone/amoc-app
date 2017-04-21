import { Component, OnInit, Input } from '@angular/core';
import { OrdersService }						from '../orders.service';
import { Order }								from '../order';

@Component({
	selector: 'order-detail',
	templateUrl: './order-detail.component.html',
	styleUrls: ['order-detail.component.css'],
	providers: [ ]
})

export class OrderDetailComponent {
	
	@Input()order: Order;
	constructor(){}
	
	updateOrder(status: string){
		//update order status e.g delivered, cancelled, finalized et
		this.order.status = status;
		//TODO: backend to save update on database
	}
}