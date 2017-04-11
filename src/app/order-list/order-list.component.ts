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
		private os: OrdersService
	){}

	ngOnInit(){
		this.listType = "Ordered";
		this.title = `Showing `+this.listType+` Orders`;
		this.loadOrders(this.listType);
	}
	loadOrders(type: string){
		this.title = `Showing `+type+` Orders`;
		console.log(type);
		this.os.getOrders(type)
				.subscribe(res=> {
					this.orders = res.filter(function(order: Order){
						console.log(order.status+" vs "+type);
						return order.status == type;
					})
				});
	}
	selectOrder(order: Order): void{
		this.title = 'Showing selected order details';
		this.selectedOrder = order;
	}

}
