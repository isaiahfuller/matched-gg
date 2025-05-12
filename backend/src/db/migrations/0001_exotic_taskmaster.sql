CREATE TABLE IF NOT EXISTS "age_rating_categories" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"organization" bigint,
	"rating" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "age_rating_content_descriptions_v2" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"description" text,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"organization" bigint,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "age_rating_organizations" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "date_format" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"format" text,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "game_status" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"status" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "game_types" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"type" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "platform_types" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "release_date_regions" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"region" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "website_types" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"type" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ageRatings" ADD COLUMN "content_descriptions" bigint[];--> statement-breakpoint
ALTER TABLE "ageRatings" ADD COLUMN "organization" bigint;--> statement-breakpoint
ALTER TABLE "ageRatings" ADD COLUMN "rating_category" bigint;--> statement-breakpoint
ALTER TABLE "ageRatings" ADD COLUMN "rating_content_descriptions" bigint[];--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "change_date_format" bigint;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "start_date_format" bigint;--> statement-breakpoint
ALTER TABLE "companyWebsites" ADD COLUMN "type" bigint;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "game_status" bigint;--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "game_type" bigint;--> statement-breakpoint
ALTER TABLE "platforms" ADD COLUMN "platform_type" bigint;--> statement-breakpoint
ALTER TABLE "platformVersionReleaseDates" ADD COLUMN "date_format" bigint;--> statement-breakpoint
ALTER TABLE "platformVersionReleaseDates" ADD COLUMN "release_region" bigint;--> statement-breakpoint
ALTER TABLE "websites" ADD COLUMN "type" bigint;--> statement-breakpoint
ALTER TABLE "ageRatings" DROP COLUMN IF EXISTS "category";--> statement-breakpoint
ALTER TABLE "ageRatings" DROP COLUMN IF EXISTS "rating";--> statement-breakpoint
ALTER TABLE "companies" DROP COLUMN IF EXISTS "change_date_category";--> statement-breakpoint
ALTER TABLE "companies" DROP COLUMN IF EXISTS "start_date_category";--> statement-breakpoint
ALTER TABLE "companyWebsites" DROP COLUMN IF EXISTS "category";--> statement-breakpoint
ALTER TABLE "games" DROP COLUMN IF EXISTS "category";--> statement-breakpoint
ALTER TABLE "games" DROP COLUMN IF EXISTS "game_category";--> statement-breakpoint
ALTER TABLE "games" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "platforms" DROP COLUMN IF EXISTS "category";--> statement-breakpoint
ALTER TABLE "platformVersionReleaseDates" DROP COLUMN IF EXISTS "category";--> statement-breakpoint
ALTER TABLE "platformVersionReleaseDates" DROP COLUMN IF EXISTS "region";--> statement-breakpoint
ALTER TABLE "websites" DROP COLUMN IF EXISTS "category";--> statement-breakpoint
DROP TYPE "public"."CategoryEnum";--> statement-breakpoint
DROP TYPE "public"."RatingEnum";--> statement-breakpoint
DROP TYPE "public"."CompanyDateCategoryEnum";--> statement-breakpoint
DROP TYPE "public"."GameCategoryEnum";--> statement-breakpoint
DROP TYPE "public"."StatusEnum";--> statement-breakpoint
DROP TYPE "public"."PlatformCategoryEnum";--> statement-breakpoint
DROP TYPE "public"."PlatformVersionReleaseDateCategoryEnum";--> statement-breakpoint
DROP TYPE "public"."PlatformVersionReleaseDateRegionEnum";--> statement-breakpoint
DROP TYPE "public"."WebsiteCategoryEnum";