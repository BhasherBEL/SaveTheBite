import type User from '$lib/types/user';
import { users, type UserSession, userSessions } from '$lib/server/db/schema';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { db } from './client';
import { eq } from 'drizzle-orm';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token: string, userId: number): Promise<UserSession> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: UserSession = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	await db.insert(userSessions).values(session);
	return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({ user: users, session: userSessions })
		.from(userSessions)
		.innerJoin(users, eq(userSessions.userId, users.id))
		.where(eq(userSessions.id, sessionId));
	if (result.length < 1) {
		return { session: null, user: null };
	}
	const { user, session } = result[0];
	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(userSessions).where(eq(userSessions.id, session.id));
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db
			.update(userSessions)
			.set({
				expiresAt: session.expiresAt
			})
			.where(eq(userSessions.id, session.id));
	}
	return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(userSessions).where(eq(userSessions.id, sessionId));
}

export type SessionValidationResult =
	| { session: UserSession; user: User }
	| { session: null; user: null };
