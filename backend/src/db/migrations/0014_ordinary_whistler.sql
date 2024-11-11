ALTER TABLE "game_franchises" DROP CONSTRAINT "game_franchises_game_id_games_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_franchises" DROP CONSTRAINT "game_franchises_franchise_id_franchises_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_game_modes" DROP CONSTRAINT "game_game_modes_game_id_games_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_game_modes" DROP CONSTRAINT "game_game_modes_game_mode_id_gameModes_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_genres" DROP CONSTRAINT "game_genres_game_id_games_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_genres" DROP CONSTRAINT "game_genres_genre_id_genres_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_keywords" DROP CONSTRAINT "game_keywords_game_id_games_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_keywords" DROP CONSTRAINT "game_keywords_keyword_id_keywords_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_multiplayer_modes" DROP CONSTRAINT "game_multiplayer_modes_game_id_games_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_multiplayer_modes" DROP CONSTRAINT "game_multiplayer_modes_multiplayer_mode_id_multiplayerModes_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_platforms" DROP CONSTRAINT "game_platforms_game_id_games_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_platforms" DROP CONSTRAINT "game_platforms_platform_id_platforms_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_similar_games" DROP CONSTRAINT "game_similar_games_game_id_games_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_similar_games" DROP CONSTRAINT "game_similar_games_similar_game_id_games_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_themes" DROP CONSTRAINT "game_themes_game_id_games_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "game_themes" DROP CONSTRAINT "game_themes_theme_id_themes_igdb_id_fk";
