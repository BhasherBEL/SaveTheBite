import { db } from './client';
import { eq, and } from 'drizzle-orm';
import { users } from './schema';
import User from '$lib/types/user';
import * as bcrypt from 'bcrypt';

export async function getUsers(): Promise<User[]> {
	return db.query.users.findMany();
}

export async function getUser(id: number): Promise<User | undefined> {
	return db.query.users.findFirst({
		where: eq(users.id, id)
	});
}

export async function registerUser(
	username: string,
	email: string,
	password: string,
	type: string,
	language: string,
	theme: string,
	defaultLocation: string
): Promise<User> {
	const hashedPassword = bcrypt.hashSync(password, 10);
	return db
		.insert(users)
		.values({
			username,
			email,
			password: hashedPassword,
			type,
			language,
			theme,
			defaultLocation
		})
		.onConflictDoNothing()
		.returning()
		.get();
}

export async function loginUser(email: string, password: string): Promise<User | undefined> {
	const user = await db.query.users.findFirst({
		where: and(eq(users.email, email))
	});
	if (!user) {
		return;
	}
	if (!bcrypt.compareSync(password, user.password)) {
		return;
	}
	return user;
}
