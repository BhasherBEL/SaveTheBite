export default class Batch {
	id: number;
	name: string;
	quantity: number;
	price: number;
	picture: string;
    description: string;

	constructor(id: number, name: string, quantity: number, price: number, picture: string) {
		this.id = id;
		this.name = name;
		this.quantity = quantity;
		this.price = price;
		this.picture = picture;
        this.description = "NOT SETUP YET";
	}
}
