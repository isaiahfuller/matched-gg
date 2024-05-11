CREATE TABLE IF NOT EXISTS "companyWebsites" (
	"category" "WebsiteCategoryEnum",
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"trusted" boolean,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text
);
