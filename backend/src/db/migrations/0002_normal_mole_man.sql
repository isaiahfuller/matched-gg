ALTER TABLE "games" ADD COLUMN "alternative_names" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "version_parent" bigint;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_version_parent_games_igdb_id_fk" FOREIGN KEY ("version_parent") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
