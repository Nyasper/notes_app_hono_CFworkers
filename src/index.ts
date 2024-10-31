import { Hono } from 'hono';
import { Router } from './routes/Router';

export default new Hono().route('/api/v1', Router);
