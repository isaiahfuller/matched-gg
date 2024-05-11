CREATE TABLE IF NOT EXISTS "covers" (
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
	"width" integer,
	"game_localization" bigint
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "covers" ADD CONSTRAINT "covers_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
