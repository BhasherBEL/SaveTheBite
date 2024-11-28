import { eq } from 'drizzle-orm';
import { db } from './client';
import { vendors, type Vendor } from './schema';

export async function getVendors() {
	const rawVendors = await db.query.vendors.findMany({
		with: {
			baskets: {
				with: {
					sales: {
						limit: 1,
						orderBy: (sales, { desc }) => [desc(sales.expiresAt)]
					},
					tags: true
				}
			}
		}
	});

	return rawVendors;
}

export async function getVendor(id: number) {
	const rawVendors = db.query.vendors.findFirst({
		where: eq(vendors.id, id),
		with: {
			baskets: {
				with: {
					sales: {
						limit: 1,
						orderBy: (sales, { desc }) => [desc(sales.expiresAt)]
					},
					tags: true
				}
			}
		}
	});

	return rawVendors;
}
