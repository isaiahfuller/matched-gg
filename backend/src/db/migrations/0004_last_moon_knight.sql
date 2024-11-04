CREATE TABLE IF NOT EXISTS "game_themes" (
	"game_id" bigint NOT NULL,
	"theme_id" bigint NOT NULL,
	CONSTRAINT "game_themes_theme_id_game_id_unique" UNIQUE("theme_id","game_id")
);
