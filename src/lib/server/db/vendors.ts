import { eq } from 'drizzle-orm';
import { db } from './client';
import Vendor from '$lib/types/vendor';
import { vendors } from './schema';

export async function getVendors(): Promise<Vendor[]> {
	const rawVendors = await db.query.vendors.findMany({
		with: {
			baskets: { with: { sales: true } }
		}
	});

	return rawVendors;
}

export async function getVendor(id: number): Promise<Vendor | undefined> {
	const rawVendors = db.query.vendors.findFirst({
		where: eq(vendors.id, id),
		with: {
			baskets: { with: { sales: true } }
		}
	});

	return rawVendors;
}
