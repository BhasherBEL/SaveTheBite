import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { db } from '$lib/server/db/client';
import * as table from '$lib/server/db/schema';
import { eq, or, SQL } from 'drizzle-orm';
import { search } from '$lib/utils/search';

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1);
	var dLon = deg2rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg: number) {
	return deg * (Math.PI / 180);
}

export async function GET({ locals, url }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	let longitude: number;
	let latitude: number;
	let distance: number;

	if (
		!url.searchParams.has('distance') ||
		!(
			url.searchParams.has('text') ||
			(url.searchParams.has('longitude') && url.searchParams.has('latitude'))
		)
	) {
		const sales = await db.query.sales.findMany({
			with: {
				basket: {
					with: {
						vendor: true
					}
				}
			}
		});

		return json(sales);
	}

	try {
		distance = parseFloat(url.searchParams.get('distance') || '');
		if (!distance) throw new Error();

		if (url.searchParams.has('text')) {
			const text = url.searchParams.get('text');
			if (!text) throw new Error();

			({ longitude, latitude } = await search(text));
		} else {
			longitude = parseFloat(url.searchParams.get('longitude') || '');
			latitude = parseFloat(url.searchParams.get('latitude') || '');
		}
	} catch (e) {
		console.log(e);
		return error(400, 'Invalid parameters');
	}

	const vendors = (await db.select().from(table.vendors)).filter(
		(vendor) =>
			getDistanceFromLatLonInKm(vendor.latitude, vendor.longitude, latitude, longitude) <= distance
	);

	let cond: SQL | undefined;

	for (const vendor of vendors) {
		if (!cond) {
			cond = eq(table.baskets.vendorId, vendor.id);
		} else {
			cond = or(cond, eq(table.baskets.vendorId, vendor.id));
		}
	}

	const baskets = await db.query.baskets.findMany({
		where: cond
	});

	cond = undefined;

	for (const basket of baskets) {
		if (!cond) {
			cond = eq(table.sales.basketId, basket.id);
		} else {
			cond = or(cond, eq(table.sales.basketId, basket.id));
		}
	}

	const sales = await db.query.sales.findMany({
		where: cond,
		with: {
			basket: {
				with: {
					vendor: true
				}
			}
		}
	});

	return json(sales);
}

export async function POST({ locals, request }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	const { basketId, quantity, remain, timeout } = await request.json();

	const basket = await db.query.baskets.findFirst({
		where: eq(table.baskets.id, basketId),
		with: {
			vendor: {
				with: {
					managers: true
				}
			}
		}
	});

	if (!basket) {
		return error(404, 'Not found');
	}

	if (
		!basket.vendor ||
		!basket.vendor.managers ||
		!basket.vendor.managers.some((manager) => manager.userId === locals.user!.id)
	) {
		return error(403, 'Forbidden');
	}

	return json(
		await db
			.insert(table.sales)
			.values({
				basketId,
				quantity,
				remain,
				timeout
			})
			.onConflictDoNothing()
			.returning()
	);
}
