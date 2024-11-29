import * as dotenv from 'dotenv';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql';

dotenv.config();

if (!process.env.DB_URL) throw new Error('DATABASE_URL is not set');

const client = createClient({ url: process.env.DB_URL, authToken: process.env.DB_TOKEN });

export const db: LibSQLDatabase<typeof schema> = drizzle(client, { schema });
