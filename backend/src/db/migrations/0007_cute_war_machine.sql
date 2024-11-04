CREATE TABLE IF NOT EXISTS "game_game_modes" (
	"game_id" bigint NOT NULL,
	"game_mode_id" bigint NOT NULL,
	CONSTRAINT "game_game_modes_game_mode_id_game_id_unique" UNIQUE("game_mode_id","game_id")
);
