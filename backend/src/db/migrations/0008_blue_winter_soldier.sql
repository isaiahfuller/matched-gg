CREATE TABLE IF NOT EXISTS "game_similar_games" (
	"game_id" bigint NOT NULL,
	"similar_game_id" bigint NOT NULL,
	CONSTRAINT "game_similar_games_similar_game_id_game_id_unique" UNIQUE("similar_game_id","game_id")
);
