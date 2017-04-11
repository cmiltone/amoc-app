import { Meal } from "./meal";
export class Order {
	id: number;
	status: string;
	date: string;
	cost: number;
	items: Meal[];
}
