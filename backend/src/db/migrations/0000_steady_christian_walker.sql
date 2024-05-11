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
DO $$ BEGIN
 CREATE TYPE "WebsiteCategoryEnum" AS ENUM('', 'official', 'wikia', 'wikipedia', 'facebook', 'twitter', 'twitch', 'instagram', 'youtube', 'iphone', 'ipad', 'android', 'steam', 'reddit', 'itch', 'epicgames', 'gog', 'discord');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artworks" (
	"alpha_channel" boolean,
	"animated" boolean,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint,
	"height" integer,
	"igdb_id" integer,
	"image_id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text,
	"width" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"aggregated_rating" double precision,
	"aggregated_rating_count" integer,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"first_release_date" timestamp,
	"game_category" "GameCategoryEnum",
	"hypes" integer,
	"game_id" serial NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
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
	CONSTRAINT "games_game_id_unique" UNIQUE("game_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "websites" (
	"category" "WebsiteCategoryEnum",
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"trusted" boolean,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "igdb_id_idx" ON "games" ("igdb_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "slug_idx" ON "games" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "games" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artworks" ADD CONSTRAINT "artworks_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "websites" ADD CONSTRAINT "websites_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
