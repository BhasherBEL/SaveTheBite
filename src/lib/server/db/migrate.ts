import * as dotenv from 'dotenv';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './client';
import config from './drizzle.config';

dotenv.config();

migrate(db, {
	migrationsFolder: config.out
});
