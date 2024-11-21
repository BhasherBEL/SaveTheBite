import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { db } from '$lib/server/db/client';
import * as table from '$lib/server/db/schema';
import { eq, or, SQL } from 'drizzle-orm';
import { addressToCoordinates, getDistanceFromLatLonInKm } from '$lib/utils/search';

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

			({ longitude, latitude } = await addressToCoordinates(text));
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
    console.log(basketId, quantity, remain, timeout);

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

    const timestamp = timeout ? new Date(timeout) : Date.now();
    console.log(timestamp);

	return json(
		await db
			.insert(table.sales)
			.values({
				basketId,
				quantity,
				remain,
				expiresAt: timestamp
			})
			.onConflictDoNothing()
			.returning()
	);
}
