import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { db } from '$lib/server/db/client';
import * as table from '$lib/server/db/schema';

export async function GET({ locals }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}
	const vendors = await db.query.vendors.findMany();
	return json(vendors);
}

export async function POST({ locals, request }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}
	const { name, description, location, longitude, latitude, picture } = await request.json();

	if (!name || !description || !location || !longitude || !latitude || !picture) {
		return error(400, 'Invalid parameters');
	}

	let nLongitude;
	let nLatitude;

	try {
		nLongitude = parseFloat(longitude);
		nLatitude = parseFloat(latitude);
	} catch (e) {
		return error(400, 'Invalid parameters');
	}

	const vendor = (
		await db
			.insert(table.vendors)
			.values({
				name,
				description,
				location,
				longitude: nLongitude,
				latitude: nLatitude,
				picture
			})
			.onConflictDoNothing()
			.returning()
	)[0];

	if (!vendor) {
		return error(409, 'Vendor already exists');
	}

	return json(
		await db
			.insert(table.managers)
			.values({
				userId: locals.user.id,
				vendorId: vendor.id
			})
			.onConflictDoNothing()
			.returning()
	);
}
