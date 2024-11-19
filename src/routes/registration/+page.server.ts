import { fail, redirect, type Actions } from '@sveltejs/kit';
import { registerUser } from '$lib/server/db/users';
import { setSessionTokenCookie } from '$lib/utils/cookies';
import { createSession, generateSessionToken } from '$lib/server/auth';

export const actions = {
	default: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();
		const defaultLocation = data.get('defaultLocation')?.toString();

		if (!name || !email || !password) {
			return fail(400, { missing: true });
		}

		// Register the user
		const user = await registerUser(name, email, password, 'customer', 'en', 'light', defaultLocation);
		if (!user) {
			return fail(400, { invalid: true });
		}

		// Create a session for the user
		const token = generateSessionToken();
		const session = await createSession(token, user.id);
		setSessionTokenCookie(cookies, token, session.expiresAt);

		// Redirect after successful registration
		redirect(303, url.searchParams.get('redirect') || '/');
	}
} satisfies Actions;
