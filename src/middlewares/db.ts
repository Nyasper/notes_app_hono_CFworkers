import { createMiddleware } from 'hono/factory';
import { drizzle } from 'drizzle-orm/libsql/web';
import { Client } from '@libsql/client';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

const createDB = ({ url, authToken }: { url: string; authToken: string }) => {
	const d = drizzle({
		connection: {
			url,
			authToken,
		},
	});
	return d;
};

export type dbContext = LibSQLDatabase<Record<string, never>> & {
	$client: Client;
};

type Env = {
	Variables: {
		db: dbContext;
	};
	Bindings: {
		TURSO_DATABASE_URL: string;
		TURSO_AUTH_TOKEN: string;
	};
};

export const useDB = createMiddleware<Env>(async (c, next) => {
	const { TURSO_DATABASE_URL: url, TURSO_AUTH_TOKEN: authToken } = c.env;
	c.set('db', createDB({ url, authToken }));
	await next();
});

// export const useAuth = createMiddleware<Env>(async (c, next) => {
// 	console.log('usando middleware Auth');
// 	await next();
// });

// export const useOtro = createMiddleware<Env>(async (c, next) => {
// 	console.log('usando middleware OTRO');
// 	await next();
// });
