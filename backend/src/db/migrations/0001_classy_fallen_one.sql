CREATE TABLE IF NOT EXISTS "game_franchises" (
	"franchise_id" bigint NOT NULL,
	"game_id" bigint NOT NULL,
	CONSTRAINT "game_franchises_franchise_id_game_id_unique" UNIQUE("franchise_id","game_id")
);
--> statement-breakpoint
ALTER TABLE "covers" ADD COLUMN "game" bigint;