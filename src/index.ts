import { Hono } from 'hono';
import { router } from './routes/router';

type Bindings = {
	ENVIRONMENT?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Global Error Handler
app.onError((err, c) => {
	console.error(`[GLOBAL_ERROR] [${c.req.method}] ${c.req.path}:`, err);
	const isDev =
		c.env?.ENVIRONMENT === 'development' ||
		c.req.header('x-debug') === 'true' ||
		c.req.url.includes('localhost') ||
		c.req.url.includes('127.0.0.1');

	const response: Record<string, any> = {
		success: false,
		message: err.message || 'Internal Server Error',
	};

	if (isDev) {
		response.debug = {
			name: err.name,
			message: err.message,
			stack: err.stack ? err.stack.split('\n') : undefined,
			cause: err.cause,
		};
	}

	return c.json(response, 500);
});

// Global 404 Handler
app.notFound((c) => {
	console.warn(`[GLOBAL_NOT_FOUND] [${c.req.method}] ${c.req.path}`);
	return c.json(
		{
			success: false,
			message: `Route not found: ${c.req.method} ${c.req.path}`,
		},
		404
	);
});

app.route('/api/v1', router);

export default app;
