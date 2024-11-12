import Database from 'better-sqlite3';
import * as dotenv from 'dotenv';
import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

dotenv.config();

const sqlite = new Database(process.env.DB_URL);

export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, {
	schema
});
