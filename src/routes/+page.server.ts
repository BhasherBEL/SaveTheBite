import { db } from '$lib/server/db/client';
import { getVendors } from '$lib/server/db/vendors';
import { addressToCoordinates, getDistanceFromLatLonInKm } from '$lib/utils/search';
import type { LoadEvent } from '@sveltejs/kit';

export async function load({ url }: LoadEvent) {
	const search = url.searchParams.get('search');

	let distance: number;
	try {
		distance = parseFloat(url.searchParams.get('distance') || '');
		console.log(distance);
	} catch (e) {
		distance = 5;
	}

	if (isNaN(distance)) {
		distance = 5;
	}

	try {
		if (!search) return { vendors: await getVendors() };

		console.log(search);

		const { longitude, latitude } = await addressToCoordinates(search);

		const vendors = await db.query.vendors.findMany({
			with: {
				baskets: { with: { sales: true } }
			}
		});

		const closeByVendors = vendors.filter(
			(vendor) =>
				getDistanceFromLatLonInKm(vendor.latitude, vendor.longitude, latitude, longitude) <=
				distance
		);
		console.log(longitude, latitude, closeByVendors.length);
		return { vendors: closeByVendors, longitude, latitude };
	} catch (error) {
		console.error('Error fetching vendors:', error);
		return { vendors: [] };
	}
}
