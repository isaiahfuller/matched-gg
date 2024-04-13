DO $$ BEGIN
 CREATE TYPE "GameCategoryEnum" AS ENUM('MAIN_GAME', 'DLC_ADDON', 'EXPANSION', 'BUNDLE', 'STANDALONE_EXPANSION', 'MOD', 'EPISODE', 'SEASON', 'REMAKE', 'REMASTER', 'EXPANDED_GAME', 'PORT', 'FORK', 'PACK', 'UPDATE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "StatusEnum" AS ENUM('RELEASED', 'ALPHA', 'BETA', 'EARLY_ACCESS', 'OFFLINE', 'CANCELLED', 'RUMORED', 'DELISTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"aggregated_rating" double precision,
	"aggregated_rating_count" integer,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"first_release_date" timestamp,
	"game_category" "GameCategoryEnum" NOT NULL,
	"hypes" integer,
	"game_id" serial PRIMARY KEY NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text NOT NULL,
	"rating" double precision,
	"rating_count" integer,
	"slug" text,
	"status" "StatusEnum",
	"storyline" text,
	"summary" text,
	"total_rating" double precision,
	"total_rating_count" integer,
	"url" text,
	"version_title" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "games_igdb_id_unique" UNIQUE("igdb_id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "igdb_id_idx" ON "games" ("igdb_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "slug_idx" ON "games" ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "games" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "summary_idx" ON "games" ("summary");