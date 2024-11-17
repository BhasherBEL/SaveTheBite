import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { db } from '$lib/server/db/client';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

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

	const { claimed } = await request.json();

	let bClaimed = claimed === 'true';

	return json(
		await db
			.update(table.orders)
			.set({
				claimed: bClaimed ? 1 : 0
			})
			.where(eq(table.orders.id, nId))
	);
}
