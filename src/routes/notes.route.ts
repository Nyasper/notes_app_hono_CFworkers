import { Hono } from 'hono';

export const notesRouter = new Hono().get('/', (c) => c.text('notes router'));
