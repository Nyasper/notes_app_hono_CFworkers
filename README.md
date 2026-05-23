# Hono Notes Backend

A REST API backend built with Hono, deployed on Cloudflare Workers. Provides endpoints for user authentication, note CRUD operations, and admin user management.

## Features

- User authentication (register/login)
- CRUD endpoints for notes
- Admin endpoints for user management
- Drizzle ORM for database access
- Bun as the local development runtime

## Tech Stack

- **Hono** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **Bun** - Local development runtime
- **Cloudflare Workers** - Deployment platform

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/notes` | Get all notes for the authenticated user |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |
| GET | `/api/admin/users` | List all users (admin only) |
| DELETE | `/api/admin/users/:id` | Delete a user (admin only) |

## Local Version (Bun)

If you want to run the backend locally with Bun instead of deploying to Cloudflare Workers, check out the local clone:

**[Nyasper/notes_app_hono_bun](https://github.com/Nyasper/notes_app_hono_bun)**

Same API, same Drizzle ORM setup, but runs entirely on your machine with Bun -- no Cloudflare account needed.


## Related Projects

- [Vue Notes App](https://github.com/Nyasper/vue-notes-app) -- the frontend that consumes this API
- [Notes App Hono (Bun local version)](https://github.com/Nyasper/notes_app_hono_bun) -- same API running locally with Bun
