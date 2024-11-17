import { db } from '$lib/server/db/client';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestEvent } from '../$types';
import { error } from '@sveltejs/kit';

export async function DELETE({ locals, params }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	const { id, userId } = params;

	let nId;
	let nUserId;

	try {
		nId = parseInt(id);
		nUserId = parseInt(userId);
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

	await db.delete(table.managers).where(eq(table.managers.userId, nUserId));
}
