ALTER TABLE "websites" DROP CONSTRAINT "websites_igdb_id_unique";--> statement-breakpoint
ALTER TABLE "websites" ADD PRIMARY KEY ("igdb_id");