import { db } from '$lib/server/db/client';
import type { ServerLoad } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as tables from '$lib/server/db/schema';

export const load: ServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user) return { user, cartSize: 0 };

	const cartSize = (
		await db.query.carts.findMany({
			where: eq(tables.carts.userId, user.id)
		})
	).length;

	return { user, cartSize };
};
