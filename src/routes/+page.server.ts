import { getVendors } from '$lib/server/db/vendors';

export async function load() {
	const vendors = await getVendors();
	return { vendors };
}
