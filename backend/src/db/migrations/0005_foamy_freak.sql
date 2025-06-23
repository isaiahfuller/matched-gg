CREATE INDEX IF NOT EXISTS "genres_idx" ON "games" USING btree ("genres");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "themes_idx" ON "games" USING btree ("themes");