ALTER TABLE "steam_user_owned_games" DROP CONSTRAINT "steam_user_owned_games_user_id_users_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "steam_user_owned_games" ADD CONSTRAINT "steam_user_owned_games_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
