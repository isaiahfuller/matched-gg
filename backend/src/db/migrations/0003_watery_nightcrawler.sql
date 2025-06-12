CREATE TABLE IF NOT EXISTS "game_recommendations" (
	"igdb_id" bigint NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "game_recommendations_user_id_igdb_id_pk" PRIMARY KEY("user_id","igdb_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_recommendations" ADD CONSTRAINT "game_recommendations_igdb_id_games_igdb_id_fk" FOREIGN KEY ("igdb_id") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_recommendations" ADD CONSTRAINT "game_recommendations_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
