CREATE TABLE IF NOT EXISTS "igdb_steam_connect" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_id" bigint NOT NULL,
	"steam_id" bigint PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
