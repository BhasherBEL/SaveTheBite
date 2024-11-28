import { db } from '$lib/server/db/client';
import { error, type ServerLoad } from '@sveltejs/kit';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: ServerLoad = async ({ locals, params }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const { id } = params;

	if (!id) {
		error(400, 'Invalid parameters');
	}

	let nId;
	try {
		nId = parseInt(id);
	} catch (e) {
		error(400, 'Invalid parameters');
	}

	const vendor = await db.query.vendors.findFirst({
		where: eq(table.vendors.id, nId),
		with: {
			managers: true,
			baskets: { with: { sales: true } }
		}
	});

	if (!vendor) {
		error(404, 'Not found');
	}

	if (!vendor.managers || !vendor.managers.some((m) => m.userId === locals.user!.id)) {
		error(403, 'Forbidden');
	}
	return { vendor };
};
