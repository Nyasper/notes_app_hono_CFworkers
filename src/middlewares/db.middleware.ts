import { createMiddleware } from 'hono/factory';
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import schema from '../db/schema/index';

let db: DbContext | null = null;
// inyect DBcontext in the hono controller
export const useDB = createMiddleware<ContextExtended>(async (c, next) => {
	if (!db) {
		// Initialize DB once
		const { TURSO_DATABASE_URL: url, TURSO_AUTH_TOKEN: authToken } = c.env;
		
		if (!url || !authToken) {
			console.error('[DATABASE_ERROR] Missing connection environment variables.');
			throw new Error(
				'Database environment variables are missing. Please define TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.'
			);
		}

		if (url.startsWith('$') || authToken.startsWith('$') || url === '' || authToken === '') {
			console.error(`[DATABASE_ERROR] Unresolved environment variables: URL="${url}"`);
			throw new Error(
				`Database environment variables are unresolved (URL is "${url}"). ` +
				'This usually means Wrangler did not receive them. Ensure they are correctly set in your .env ' +
				'or that wrangler is running with local environment variables configured.'
			);
		}

		try {
			db = drizzle({ connection: { url, authToken }, schema });
			console.log('Database Connected Successfully');
		} catch (dbError: any) {
			console.error('[DATABASE_CONNECTION_FAILED]', dbError);
			throw new Error(`Failed to initialize database connection: ${dbError.message}`);
		}
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
