import { db } from '$lib/server/db/client';
import { json } from '@sveltejs/kit';

export async function GET() {
	const tags = await db.query.tags.findMany();

	return json(tags);
}
