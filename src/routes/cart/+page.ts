import type { Cart } from '$lib/server/db/schema';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const cart: Cart = await fetch('/api/carts').then((r) => r.json());
		return { cart };
	} catch (error) {
		console.error('Error fetching carts:', error);
		return { cart: [] };
	}
};
