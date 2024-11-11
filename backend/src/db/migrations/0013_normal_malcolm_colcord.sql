ALTER TABLE "steam_user_owned_games" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "game_similar_games" ADD CONSTRAINT "game_similar_games_game_id_similar_game_id_pk" PRIMARY KEY("game_id","similar_game_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_franchises" ADD CONSTRAINT "game_franchises_game_id_games_igdb_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_franchises" ADD CONSTRAINT "game_franchises_franchise_id_franchises_igdb_id_fk" FOREIGN KEY ("franchise_id") REFERENCES "public"."franchises"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_game_modes" ADD CONSTRAINT "game_game_modes_game_id_games_igdb_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_game_modes" ADD CONSTRAINT "game_game_modes_game_mode_id_gameModes_igdb_id_fk" FOREIGN KEY ("game_mode_id") REFERENCES "public"."gameModes"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_genres" ADD CONSTRAINT "game_genres_game_id_games_igdb_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_genres" ADD CONSTRAINT "game_genres_genre_id_genres_igdb_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_keywords" ADD CONSTRAINT "game_keywords_game_id_games_igdb_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_keywords" ADD CONSTRAINT "game_keywords_keyword_id_keywords_igdb_id_fk" FOREIGN KEY ("keyword_id") REFERENCES "public"."keywords"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_multiplayer_modes" ADD CONSTRAINT "game_multiplayer_modes_game_id_games_igdb_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_multiplayer_modes" ADD CONSTRAINT "game_multiplayer_modes_multiplayer_mode_id_multiplayerModes_igdb_id_fk" FOREIGN KEY ("multiplayer_mode_id") REFERENCES "public"."multiplayerModes"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_platforms" ADD CONSTRAINT "game_platforms_game_id_games_igdb_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_platforms" ADD CONSTRAINT "game_platforms_platform_id_platforms_igdb_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."platforms"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_similar_games" ADD CONSTRAINT "game_similar_games_game_id_games_igdb_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_similar_games" ADD CONSTRAINT "game_similar_games_similar_game_id_games_igdb_id_fk" FOREIGN KEY ("similar_game_id") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_themes" ADD CONSTRAINT "game_themes_game_id_games_igdb_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_themes" ADD CONSTRAINT "game_themes_theme_id_themes_igdb_id_fk" FOREIGN KEY ("theme_id") REFERENCES "public"."themes"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "steam_user_owned_games" ADD CONSTRAINT "steam_user_owned_games_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
