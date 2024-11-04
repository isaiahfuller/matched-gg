CREATE TABLE IF NOT EXISTS "game_platforms" (
	"game_id" bigint NOT NULL,
	"platform_id" bigint NOT NULL,
	CONSTRAINT "game_platforms_platform_id_game_id_unique" UNIQUE("platform_id","game_id")
);
