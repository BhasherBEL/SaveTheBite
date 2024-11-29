import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './src/lib/server/db/migrations',

	dbCredentials: {
		url: process.env.DB_URL as string,
		authToken: process.env.DB_TOKEN as string
	},

	verbose: true,
	strict: true,
	dialect: 'sqlite',
	driver: process.env.DB_TOKEN ? 'turso' : undefined
});
