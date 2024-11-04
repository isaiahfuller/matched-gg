CREATE TABLE IF NOT EXISTS "game_genres" (
	"game_id" bigint NOT NULL,
	"genre_id" bigint NOT NULL,
	CONSTRAINT "game_genres_genre_id_game_id_unique" UNIQUE("genre_id","game_id")
);
