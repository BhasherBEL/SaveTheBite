import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { db } from '$lib/server/db/client';
import * as table from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';

export async function DELETE({ locals, params }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	const { id: sBasketId, tag_id: sTagId } = params;

	let tagId, basketId;
	try {
		tagId = parseInt(sTagId);
		basketId = parseInt(sBasketId);
	} catch (e) {
		return error(400, 'Invalid parameters');
	}

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
		!basket.vendor.managers.some((m) => m.userId === locals.user!.id)
	) {
		return error(403, 'Forbidden');
	}

	db.delete(table.basketTags).where(
		and(eq(table.basketTags.basketId, basketId), eq(table.basketTags.tagId, tagId))
	);
}
