ALTER TABLE "steam_profiles" ADD COLUMN "avatar" text;--> statement-breakpoint
ALTER TABLE "steam_profiles" ADD COLUMN "created_at" date DEFAULT now();--> statement-breakpoint
ALTER TABLE "steam_profiles" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "steam_profiles" ADD COLUMN "updated_at" date DEFAULT now();--> statement-breakpoint
ALTER TABLE "steam_profiles" ADD COLUMN "url" text;