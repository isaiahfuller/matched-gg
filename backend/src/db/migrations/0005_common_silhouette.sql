CREATE TABLE IF NOT EXISTS "game_multiplayerModes" (
	"game_id" bigint NOT NULL,
	"multiplayer_mode_id" bigint NOT NULL,
	CONSTRAINT "game_multiplayerModes_multiplayer_mode_id_game_id_unique" UNIQUE("multiplayer_mode_id","game_id")
);
