DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_steam_id_steam_profiles_steam_id_fk" FOREIGN KEY ("steam_id") REFERENCES "public"."steam_profiles"("steam_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
