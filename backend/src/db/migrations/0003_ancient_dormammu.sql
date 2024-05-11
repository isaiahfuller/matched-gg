DO $$ BEGIN
 CREATE TYPE "CollectionTypeEnum" AS ENUM('', 'MEMBER', 'SPINOFF');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collectionMemberships" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint,
	"checksum" text,
	"type" "CollectionTypeEnum"
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collectionMemberships" ADD CONSTRAINT "collectionMemberships_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collectionMemberships" ADD CONSTRAINT "collectionMemberships_game_collections_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "collections"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
