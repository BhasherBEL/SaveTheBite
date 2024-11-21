import type { Vendor } from '$lib/server/db/schema';
import type { PageLoad } from './$types';
import { getVendor } from '$lib/server/db/vendors';

export const load: PageLoad = async({ params }) => {
    try { 
        console.log('param:', params);
        const vendor: Vendor = await getVendor(params.id);
        return { vendor };
    } catch (error) {
        console.log('Error fetching vendor:', error);
        return { vendor: null };
    }
}
