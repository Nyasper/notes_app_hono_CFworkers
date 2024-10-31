DROP INDEX IF EXISTS "users_email_unique";--> statement-breakpoint
ALTER TABLE `notes` ALTER COLUMN "created" TO "created" text DEFAULT 'Thu Oct 31 2024 20:11:11 GMT-0300 (hora estándar de Uruguay)';--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created" TO "created" text DEFAULT 'Thu Oct 31 2024 20:11:11 GMT-0300 (hora estándar de Uruguay)';