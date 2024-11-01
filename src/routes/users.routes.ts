import { Hono } from 'hono';

export const usersRouter = new Hono().get('/', (c) => c.text('user router'));
