import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { db } from '$lib/server/db/client';
import * as table from '$lib/server/db/schema';
import { and, eq, SQL } from 'drizzle-orm';

export async function GET({ locals, url }: RequestEvent) {
	if (!locals.user) {
		return error(401, 'Unauthorized');
	}

	const includeClaimed = url.searchParams.get('includeClaimed') === 'true';

	let cond: SQL | undefined = eq(table.orders.userId, locals.user.id);
	if (!includeClaimed) {
		cond = and(cond, eq(table.orders.claimed, 1));
	}

	const orders = await db.query.orders.findMany({
		where: cond,
		with: {
			sale: {
				with: { 
                    basket: {
                        with: {
                            vendor: true,
                        }
                    }
                }
			}
		}
	});

	return json(orders);
}
