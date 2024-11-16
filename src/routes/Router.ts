import { Hono } from 'hono';
import { authRouter } from './auth.routes';
import { notesRouter } from './notes.routes';
import { adminRouter } from './admin/router';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

export const router = new Hono()
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
	.get('/', (c) => c.text('hello hono notes API!'))
	.route('/auth', authRouter)
	.route('/notes', notesRouter)
	.route('/admin', adminRouter);
