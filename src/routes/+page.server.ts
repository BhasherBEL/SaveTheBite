import { getVendors } from '$lib/server/db/vendors';
import type { LoadEvent } from '@sveltejs/kit';

export async function load({ url }: LoadEvent) {
	const search = url.searchParams.get('search');

	try {
		const vendors = await getVendors();
		console.log('server vendors: ', vendors);
		return { vendors };
	} catch (error) {
		console.error('Error fetching vendors:', error);
		return { vendors: [] };
	}
}
