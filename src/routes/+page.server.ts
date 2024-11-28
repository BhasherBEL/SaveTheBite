import { db } from '$lib/server/db/client';
import { getVendors } from '$lib/server/db/vendors';
import { addressToCoordinates, getDistanceFromLatLonInKm } from '$lib/utils/search';
import type { LoadEvent } from '@sveltejs/kit';

export async function load({ url }: LoadEvent) {
	const search = url.searchParams.get('search');

	let distance: number;
	try {
		distance = parseFloat(url.searchParams.get('distance') || '');
	} catch (e) {
		distance = 5;
	}

	if (isNaN(distance)) {
		distance = 5;
	}

	let vendors;
	let longitude: number | undefined;
	let latitude: number | undefined;

	try {
		vendors = await getVendors();
	} catch (error) {
		console.log('Error fetching vendors:', error);
		return { vendors: [] };
	}

	let filteredVendors = [];

	for (const vendor of vendors) {
		for (const basket of vendor.baskets) {
			basket.sales = basket.sales.filter((sale) => sale.remain > 0 && sale.expiresAt > new Date());
		}
		vendor.baskets = vendor.baskets.filter((basket) => basket.sales.length > 0);
		if (vendor.baskets.length === 0) continue;
		filteredVendors.push(vendor);
	}

	vendors = filteredVendors;

	if (search) {
		try {
			({ longitude, latitude } = await addressToCoordinates(search));
			if (longitude && latitude) {
				vendors = vendors.filter(
					(vendor) =>
						getDistanceFromLatLonInKm(vendor.latitude, vendor.longitude, latitude!, longitude!) <=
						distance
				);
			}
		} catch (e) {
			console.error('Error fetching coordinates', e);
		}
	}

	let filters = [];
	try {
		filters = await db.query.tags.findMany();
		console.log('filters', filters);
	} catch (error) {
		console.log('Error fetching filters:', error);
	}

	return { vendors: vendors, longitude, latitude, filters };
}
