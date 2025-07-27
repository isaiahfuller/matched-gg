ALTER TABLE "game_recommendations" DROP CONSTRAINT "game_recommendations_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "steam_profiles" DROP CONSTRAINT "steam_profiles_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "steam_profiles" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "game_recommendations" ADD CONSTRAINT "game_recommendations_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "steam_profiles" ADD CONSTRAINT "steam_profiles_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
