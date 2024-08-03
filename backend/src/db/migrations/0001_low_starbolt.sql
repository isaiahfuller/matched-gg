ALTER TABLE "games" ADD COLUMN "age_ratings" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "artworks" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "bundles" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "category" "GameCategoryEnum";--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "collections" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "cover" bigint;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "dlcs" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "expanded_games" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "expansions" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "external_games" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "forks" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "franchise" bigint;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "franchises" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "game_engines" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "game_localizations" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "game_modes" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "genres" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "involved_companies" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "keywords" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "language_supports" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "multiplayer_modes" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "parent_game" bigint;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "platforms" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "player_perspectives" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "ports" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "release_dates" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "remakes" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "remasters" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "screenshots" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "similar_games" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "standalone_expansions" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "tags" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "themes" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "videos" bigint[];--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "websites" bigint[];--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_cover_covers_igdb_id_fk" FOREIGN KEY ("cover") REFERENCES "public"."covers"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_franchise_franchises_igdb_id_fk" FOREIGN KEY ("franchise") REFERENCES "public"."franchises"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_parent_game_games_igdb_id_fk" FOREIGN KEY ("parent_game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
