import type Batch from './Batch';

export default class Market {
	id: number;
	name: string;
	address: string;
	batches: Batch[];

	constructor(id: number, name: string, address: string, batches: Batch[]) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.batches = batches;
	}
}
