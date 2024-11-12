export default class Basket {
	id: number;
	name: string;
	vendorId: number;
	initialPrice: number;
	price: number;
	picture: string | null;

	constructor(
		id: number,
		name: string,
		vendorId: number,
		initialPrice: number,
		price: number,
		picture: string | null
	) {
		this.id = id;
		this.name = name;
		this.vendorId = vendorId;
		this.initialPrice = initialPrice;
		this.price = price;
		this.picture = picture;
	}
}
