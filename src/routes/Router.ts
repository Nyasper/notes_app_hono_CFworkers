import { Hono } from 'hono';
import { usersRouter } from './users.route';
import { notesRouter } from './notes.route';

export const Router = new Hono()
	.get('/', (c) => c.text('hello hono notes API!'))
	.route('/users', usersRouter)
	.route('/notes', notesRouter);
