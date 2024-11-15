import { getVendors } from '$lib/server/db/vendors';

export async function load() {
    try {
        const vendors = await getVendors();
        console.log("server vendors: ", vendors);
        return { vendors };
    } catch (error) {
        console.error("Error fetching vendors:", error);
        return { vendors: [] };
    }
}
