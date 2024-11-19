import { getVendors } from '$lib/server/db/vendors';

export async function load() {
    try {
        const vendors = await getVendors();
        return { vendors };
    } catch (error) {
        console.error("Error fetching vendors:", error);
        return { vendors: [] };
    }
}
