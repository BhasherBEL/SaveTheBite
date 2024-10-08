export default class Batch {
	id: number;
	name: string;
	quantity: number;
	price: number;
	picture: string;

	constructor(id: number, name: string, quantity: number, price: number, picture: string) {
		this.id = id;
		this.name = name;
		this.quantity = quantity;
		this.price = price;
		this.picture = picture;
	}
}
