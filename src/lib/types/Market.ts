import type Batch from './Batch';

export default class Market {
	id: number;
	name: string;
	address: string;
    picture: string;
	batches: Batch[];

	constructor(id: number, name: string, address: string, batches: Batch[], picture: string) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.batches = batches;
        this.picture = picture;
	}
}
