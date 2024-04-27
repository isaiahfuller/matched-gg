CREATE TABLE IF NOT EXISTS "artworks" (
	"alpha_channel" boolean,
	"animated" boolean,
	"checksum" text,
	"game" bigint,
	"height" integer,
	"image_id" text,
	"url" text,
	"width" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artworks" ADD CONSTRAINT "artworks_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
