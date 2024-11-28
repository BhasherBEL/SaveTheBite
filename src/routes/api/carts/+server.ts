import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { db } from '$lib/server/db/client';
import * as table from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

export async function GET({ locals }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	const cart = await db.query.carts.findMany({
		where: eq(table.carts.userId, locals.user.id),
		with: {
			sale: {
				with: { basket: true }
			}
		}
	});

	return json(cart);
}

export async function DELETE({ locals, request }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	if (!request.body) {
		return json(await db.delete(table.carts).where(eq(table.carts.userId, locals.user.id)));
	} else {
		const { saleId } = await request.json();
		return json(
			await db
				.delete(table.carts)
				.where(and(eq(table.carts.userId, locals.user.id), eq(table.carts.saleId, saleId)))
		);
	}
}

export async function POST({ locals, request }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}
	const { saleId, quantity } = await request.json();

	const cart = await db.query.carts.findFirst({
		where: and(eq(table.carts.userId, locals.user.id), eq(table.carts.saleId, saleId))
	});
	if (cart) {
		await db
			.update(table.carts)
			.set({ quantity: quantity })
			.where(eq(table.carts.id, cart.id))
			.returning();
	} else {
		await db
			.insert(table.carts)
			.values({
				userId: locals.user.id,
				saleId,
				quantity
			})
			.returning();
	}

	return json(
		await db.query.carts.findMany({
			where: eq(table.carts.userId, locals.user.id),
			with: {
				sale: {
					with: { basket: true }
				}
			}
		})
	);
}
