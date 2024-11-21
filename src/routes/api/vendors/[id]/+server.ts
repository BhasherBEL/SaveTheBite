import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { db } from '$lib/server/db/client';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { addressToCoordinates } from '$lib/utils/search';

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

	await db.delete(table.vendors).where(eq(table.vendors.id, nId));
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

    const { name, description, location, picture } = await request.json();

    if (!name || !description || !location || !picture) {
        return error(400, 'Invalid parameters');
    }

    let longitude, latitude;

    try {
        ({ longitude, latitude } = await addressToCoordinates(location));
    } catch (e) {
        console.error(e);
        return error(400, 'Invalid location');
    }

    return json(
        await db
            .update(table.vendors)
            .set({
                name,
                description,
                location,
                longitude,
                latitude,
                picture
            })
            .where(eq(table.vendors.id, nId))
    );
}
