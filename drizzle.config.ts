import { defineConfig } from 'drizzle-kit';

const { TURSO_DATABASE_URL: url, TURSO_AUTH_TOKEN: authToken } = process.env;
if (!url || !authToken) throw new Error('Env variables not setted');

export default defineConfig({
	out: './drizzle',
	schema: [
		'./src/db/schemas/user.schema.ts',
		'./src/db/schemas/notes.schema.ts',
	],
	dialect: 'turso',
	dbCredentials: {
		url,
		authToken,
	},
});
