import type { Order } from '$lib/server/db/schema';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let res = {};

	try {
		const orders: Order[] = await fetch('/api/orders', {
			method: 'GET'
		}).then((res) => res.json());

		res = { ...res, orders };
	} catch (error) {
		console.warn('Error fetching orders:', error);
		res = { ...res, orders: [] };
	}

	return res;
};
