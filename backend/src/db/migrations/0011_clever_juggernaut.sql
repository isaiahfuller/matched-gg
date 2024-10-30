ALTER TABLE "steam_profiles" ALTER COLUMN "steam_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "steam_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "refresh_token";