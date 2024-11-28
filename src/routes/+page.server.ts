import { db } from '$lib/server/db/client';
import { getVendors } from '$lib/server/db/vendors';
import { addressToCoordinates, getDistanceFromLatLonInKm } from '$lib/utils/search';
import { type LoadEvent, error } from '@sveltejs/kit';

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

	let currentTagsText = url.searchParams.get('tags');
	let currentTagsString = currentTagsText ? currentTagsText.split(',') : [];

	let tags;
	try {
		tags = await db.query.tags.findMany();
	} catch (e: any) {
		console.warn('Error fetching tags:', e);
		error(500, 'Error fetching tags');
	}

	let currentTags = tags.filter((tag) => currentTagsString.includes(tag.name));

	let filteredVendors = [];

	for (const vendor of vendors) {
		for (const basket of vendor.baskets) {
			for (const tag of currentTags) {
				if (!basket.tags.find((t) => t.tagId === tag.id)) {
					basket.sales = [];
					continue;
				}
			}
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

	return { vendors: vendors, longitude, latitude, tags, currentTags };
}
