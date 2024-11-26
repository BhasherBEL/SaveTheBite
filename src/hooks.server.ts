import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db/client';
import { eq } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);
	if (session) {
		auth.setSessionTokenCookie(event.cookies, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event.cookies);
	}

	if (!user || !session) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const userData = await db.query.users.findFirst({
		where: eq(table.users.id, user.id),
		with: {
			managers: {
				with: {
					vendor: true
				}
			}
		}
	});

	event.locals.user = userData;
	event.locals.session = session;

	return resolve(event);
};

export const handle: Handle = handleAuth;
