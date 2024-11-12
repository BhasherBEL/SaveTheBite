export default class Sale {
	id: number;
	basketId: number;
	quantity: number;
	remain: number;
	timeout: number;
	withdrawn: number;

	constructor(
		id: number,
		basketId: number,
		quantity: number,
		remain: number,
		timeout: number,
		withdrawn: number
	) {
		this.id = id;
		this.basketId = basketId;
		this.quantity = quantity;
		this.remain = remain;
		this.timeout = timeout;
		this.withdrawn = withdrawn;
	}
}
