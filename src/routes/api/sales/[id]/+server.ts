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

	const sale = await db.query.sales.findFirst({
		where: eq(table.sales.id, nId),
		with: {
			basket: {
				with: {
					vendor: {
						with: {
							managers: true
						}
					}
				}
			}
		}
	});

	if (!sale) {
		return error(404, 'Not found');
	}

	if (
		!sale.basket ||
		!sale.basket.vendor ||
		!sale.basket.vendor.managers ||
		!sale.basket.vendor.managers.some((m) => m.userId === locals.user!.id)
	) {
		return error(403, 'Forbidden');
	}

	return json(await db.delete(table.sales).where(eq(table.sales.id, nId)));
}

export async function PUT({ locals, params, request }: RequestEvent) {
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
	const { quantity, remain, expiresAt } = await request.json();

	if (!quantity || !remain || !expiresAt) {
		return error(400, 'Invalid parameters or missing fields');
	}

	const sale = await db.query.sales.findFirst({
		where: eq(table.sales.id, nId),
		with: {
			basket: {
				with: {
					vendor: {
						with: {
							managers: true
						}
					}
				}
			}
		}
	});

	if (!sale) {
		return error(404, 'Not found');
	}

	if (
		!sale.basket ||
		!sale.basket.vendor ||
		!sale.basket.vendor.managers ||
		!sale.basket.vendor.managers.some((m) => m.userId === locals.user!.id)
	) {
		return error(403, 'Forbidden');
	}

	const timestamp = expiresAt ? new Date(expiresAt) : Date.now();

	return json(
		await db
			.update(table.sales)
			.set({
				quantity,
				remain,
				expiresAt: timestamp
			})
			.where(eq(table.sales.id, nId))
			.returning()
	);
}
