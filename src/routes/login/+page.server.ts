import { loginUser } from '$lib/server/db/users';
import { setSessionTokenCookie } from '$lib/utils/cookies';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import type { Actions } from './$types';
import { createSession, generateSessionToken } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(303, '/');
	}
};

export const actions = {
	default: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, { missing: true });
		}

		const user = await loginUser(email, password);
		if (!user) {
			return fail(400, { invalid: true });
		}

		const token = generateSessionToken();
		const session = await createSession(token, user.id);
		setSessionTokenCookie(cookies, token, session.expiresAt);

		redirect(303, '/');
	}
} satisfies Actions;
