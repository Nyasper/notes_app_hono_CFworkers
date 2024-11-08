import { createMiddleware } from 'hono/factory';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import schema from '../db/schema/index';

let db: DbContext | null = null;
// inyect DBcontext in the hono controller
export const useDB = createMiddleware<ContextExtended>(async (c, next) => {
	if (!db) {
		// Initialize DB once
		const { TURSO_DATABASE_URL: url, TURSO_AUTH_TOKEN: authToken } = c.env;
		if (!url || !authToken) throw new Error('Database ENV missing');
		db = drizzle({ connection: { url, authToken }, schema });
		console.log('Data Base Conected');
	}

	c.set('db', db);
	return await next();
});

export type DbContext = LibSQLDatabase<typeof schema>;

export interface ContextExtended {
	Variables: {
		db: DbContext;
	};
	Bindings: {
		TURSO_DATABASE_URL: string;
		TURSO_AUTH_TOKEN: string;
		JWT_SECRET: string;
	};
}
