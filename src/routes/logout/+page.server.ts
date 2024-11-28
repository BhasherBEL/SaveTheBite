import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth';

export const actions: Actions = {
	default: async ({ locals, cookies }) => {
		if (!locals.session) {
			return fail(401);
		}

		invalidateSession(locals.session.id);
		deleteSessionTokenCookie(cookies);

		return redirect(302, '/');
	}
};
