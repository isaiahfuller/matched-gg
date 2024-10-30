CREATE TABLE IF NOT EXISTS "steam_profiles" (
	"steam_id" bigint PRIMARY KEY NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "steam_id" bigint;