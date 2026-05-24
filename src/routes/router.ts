import { Hono } from 'hono';
import { authRouter } from './auth.routes';
import { notesRouter } from './notes.routes';
import { adminRouter } from './admin/router';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

type Bindings = {
	ENVIRONMENT?: string;
};

export const router = new Hono<{ Bindings: Bindings }>()
	.use(logger())
	.use(
		'/*',
		cors({
			origin: [
				'http://localhost:5173',
				'http://localhost:4173',
				'https://vue-notes-app-rose.vercel.app',
			],
			credentials: true,
		})
	)
	.use('*', async (c, next) => {
		await next();
		
		const isDev =
			c.env?.ENVIRONMENT === 'development' ||
			c.req.header('x-debug') === 'true' ||
			c.req.url.includes('localhost') ||
			c.req.url.includes('127.0.0.1');

		if (!isDev && c.res.headers.get('content-type')?.includes('application/json')) {
			try {
				const bodyText = await c.res.clone().text();
				const body = JSON.parse(bodyText);
				if (body && typeof body === 'object') {
					let modified = false;
					if ('error' in body) {
						delete body.error;
						modified = true;
					}
					if ('stack' in body) {
						delete body.stack;
						modified = true;
					}
					if (modified) {
						c.res = new Response(JSON.stringify(body), c.res);
					}
				}
			} catch {
				// Ignore any parsing or cloning failures
			}
		}
	})
	.onError((err, c) => {
		console.error(`[ERROR] [${c.req.method}] ${c.req.path}:`, err);
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
	})
	.notFound((c) => {
		console.warn(`[NOT_FOUND] [${c.req.method}] ${c.req.path}`);
		return c.json(
			{
				success: false,
				message: `Route not found: ${c.req.method} ${c.req.path}`,
			},
			404
		);
	})
	.get('/', (c) => c.text('hello hono notes API!'))
	.route('/auth', authRouter)
	.route('/notes', notesRouter)
	.route('/admin', adminRouter);

