import type Basket from './basket';

export default class Market {
	id: number;
	name: string;
	location: string;
	longitude: number;
	latitude: number;
	picture: string | null;
	createdAt: Date;
	updatedAt: Date;
	baskets: Basket[];

	constructor(
		id: number,
		name: string,
		location: string,
		longitude: number,
		latitude: number,
		picture: string | null,
		createdAt: Date,
		updatedAt: Date,
		baskets: Basket[]
	) {
		this.id = id;
		this.name = name;
		this.location = location;
		this.longitude = longitude;
		this.latitude = latitude;
		this.picture = picture;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.baskets = baskets;
	}
}
