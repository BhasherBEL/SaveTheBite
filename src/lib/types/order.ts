export default class Order {
	id: number;
	userId: number;
	saleId: number;
	claimed: number;

	constructor(id: number, userId: number, saleId: number, claimed: number) {
		this.id = id;
		this.userId = userId;
		this.saleId = saleId;
		this.claimed = claimed;
	}
}
