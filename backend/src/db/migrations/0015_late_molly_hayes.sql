CREATE TABLE IF NOT EXISTS "game_screenshots" (
	"game_id" bigint NOT NULL,
	"screenshot_id" bigint NOT NULL,
	CONSTRAINT "game_screenshots_screenshot_id_game_id_unique" UNIQUE("screenshot_id","game_id")
);
