import { createSession, generateSessionToken, validateSessionToken } from '$lib/server/db/sessions';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { registerUser } from '$lib/server/db/users';
import { setSessionTokenCookie } from '$lib/utils/cookies';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('session');
	if (token) {
		const { user } = await validateSessionToken(token);
		return { user };
	}

	return {};
};

export const actions = {
	default: async ({ cookies, request, url }) => {
		const data = await request.formData();

		const username = data.get('username')?.toString();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!username || !email || !password) {
			return fail(400, { missing: true });
		}

		const user = await registerUser(username, email, password, 'user');
		if (!user) {
			return fail(400, { invalid: true });
		}

		const token = generateSessionToken();
		const session = await createSession(token, user.id);
		setSessionTokenCookie(cookies, token, session.expiresAt);

		redirect(303, url.searchParams.get('redirect') || '/');
	}
} satisfies Actions;
