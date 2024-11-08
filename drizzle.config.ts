import { defineConfig } from 'drizzle-kit';

const { TURSO_DATABASE_URL: url, TURSO_AUTH_TOKEN: authToken } = process.env;
if (!url || !authToken) throw new Error('Env variables not setted');

export default defineConfig({
	out: './drizzle',
	schema: './src/db/schema',
	dialect: 'turso',
	dbCredentials: {
		url,
		authToken,
	},
});
