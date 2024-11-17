import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { db } from '$lib/server/db/client';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST({ locals, params, request }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}
	const { userId } = await request.json();
	const { id } = params;

	let nId;

	try {
		nId = parseInt(id);
	} catch (e) {
		return error(400, 'Invalid parameters');
	}

	const vendor = await db.query.vendors.findFirst({
		where: eq(table.vendors.id, nId),
		with: { managers: true }
	});

	if (!vendor) {
		return error(404, 'Not found');
	}

	if (!vendor.managers || !vendor.managers.some((m) => m.userId === locals.user!.id)) {
		return error(403, 'Forbidden');
	}

	return json(
		await db
			.insert(table.managers)
			.values({
				userId,
				vendorId: nId
			})
			.onConflictDoNothing()
			.returning()
	);
}
