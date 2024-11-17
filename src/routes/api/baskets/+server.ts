import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { db } from '$lib/server/db/client';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST({ locals, request }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	const { name, description, vendorId, initialPrice, price, picture } = await request.json();

	const vendor = await db.query.vendors.findFirst({
		where: eq(table.vendors.id, vendorId),
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
			.insert(table.baskets)
			.values({
				name,
				description,
				vendorId,
				initialPrice,
				price,
				picture
			})
			.onConflictDoNothing()
			.returning()
	);
}
