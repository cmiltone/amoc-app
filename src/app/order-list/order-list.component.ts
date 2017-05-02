import { Component, OnInit } 		from '@angular/core';
import { Order }					from '../order';
import { OrdersService }				from '../orders.service';

@Component({
	selector: 'app-order-list',
	templateUrl: './order-list.component.html',
	styleUrls: ['./order-list.component.css'],
	providers: [
		OrdersService
	]
})
export class OrderListComponent implements OnInit {

	title = "";
	listType = "";

	orders: Order[];
	selectedOrder: Order;
	constructor(
		private ordersService: OrdersService
	){}

	ngOnInit(){

		this.listType = "Ordered";
		this.title = `Showing `+this.listType+` Orders`;
		this.loadOrders(this.listType);
	}
	loadOrders(type: string){
		console.log("load orders");
		this.title = `Showing `+type+` Orders`;
		this.ordersService.getOrders(type)
				.subscribe(res=> this.orders = res);/**/
	}
	selectOrder(order: Order): void{
		this.title = 'Showing selected order details';
		this.selectedOrder = order;
	}

}
