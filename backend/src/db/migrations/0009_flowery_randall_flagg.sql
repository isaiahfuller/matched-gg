CREATE TABLE IF NOT EXISTS "steam_user_owned_games" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_played" timestamp,
	"playtime" integer,
	"playtime_deck" integer,
	"playtime_linux" integer,
	"playtime_mac" integer,
	"playtime_windows" integer,
	"steam_id" bigint,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer
);
