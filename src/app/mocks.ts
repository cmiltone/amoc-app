import { Meal } from './meal';
import { Order } from './order';
import { Restaurant } from './restaurant';
export const MockMeals: Meal[] = [
    {
      id: 12345,
      name: "Nyama Choma",
      price: 440,
      category: "Stew",
      restaurant: "Jadina",
      imageUrls: []
    },
    {
      id: 12345,
      name: "Fish Fry",
      price: 440,
      category: "Stew",
      restaurant: "Jadina",
      imageUrls: []
    },
    {
      id: 12345,
      name: "Fried Chicken",
      price: 440,
      category: "Stew",
      restaurant: "Jadina",
      imageUrls: []
    }
];

export const MockOrders: Order[] = [
	{
		id: 12345,
		status: "Delivered",
		date: "12-12-2016",
		cost: 400,
		items: [
			{
				id: 123,
				name: "Fish Fry",
				price: 400,
				category: "Stew",
				restaurant: "Jadina",
				imageUrls: []
			}
		]
	},
	{
		id: 12345,
		status: "Ordered",
		date: "12-12-2016",
		cost: 440,
		items: [
			{
				id: 123,
				name: "Fish Fry",
				price: 440,
				category: "Stew",
				restaurant: "Mahindi",
				imageUrls: []
			}
		]
	}
];

export const MockRestaurants: Restaurant[] = [
	{
		id: 1234,
		name: "Jadina",
		location: "Eldoret"
	}
]