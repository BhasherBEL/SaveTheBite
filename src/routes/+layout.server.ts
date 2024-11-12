import { validateSessionToken } from '$lib/server/db/sessions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('session');

	if (token) {
		const { user } = await validateSessionToken(token);
		return { user };
	}

	return {};
};
