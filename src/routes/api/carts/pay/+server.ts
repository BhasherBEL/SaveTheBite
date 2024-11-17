import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { db } from '$lib/server/db/client';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST({ locals }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	const cartItems = await db.query.carts.findMany({
		where: eq(table.carts.userId, locals.user.id)
	});

	if (cartItems.length === 0) {
		return error(404, 'Cart not found');
	}

	for (const item of cartItems) {
		await db.insert(table.orders).values({
			userId: item.userId,
			saleId: item.saleId,
			quantity: item.quantity,
			claimed: 0
		});
	}

	return json(
		await db.delete(table.carts).where(eq(table.carts.userId, locals.user.id)).returning()
	);
}
