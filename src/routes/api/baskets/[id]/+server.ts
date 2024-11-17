import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { db } from '$lib/server/db/client';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE({ locals, params }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	const { id } = params;

	let nId;

	try {
		nId = parseInt(id);
	} catch (e) {
		return error(400, 'Invalid parameters');
	}

	const basket = await db.query.baskets.findFirst({
		where: eq(table.baskets.id, nId),
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
		!basket.vendor.managers.some((m) => m.userId === locals.user!.id)
	) {
		return error(403, 'Forbidden');
	}

	await db.delete(table.baskets).where(eq(table.baskets.id, nId));
}

export async function PUT({ locals, params, request }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	const { id } = params;
	const { name, description, price, initialPrice, picture } = await request.json();

	let nId;

	try {
		nId = parseInt(id);
	} catch (e) {
		return error(400, 'Invalid parameters');
	}

	const basket = await db.query.baskets.findFirst({
		where: eq(table.baskets.id, nId),
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
		!basket.vendor.managers.some((m) => m.userId === locals.user!.id)
	) {
		return error(403, 'Forbidden');
	}

	return json(
		await db
			.update(table.baskets)
			.set({
				name,
				description,
				price,
				initialPrice,
				picture
			})
			.where(eq(table.baskets.id, nId))
			.returning()
	);
}
