DO $$ BEGIN
 CREATE TYPE "AgeRatingCDCategoryEnum" AS ENUM('', 'ESRB_alcohol_reference', 'ESRB_animated_blood', 'ESRB_blood', 'ESRB_blood_and gore', 'ESRB_cartoon_violence', 'ESRB_comic_mischief', 'ESRB_crude_humor', 'ESRB_drug_reference', 'ESRB_fantasy_violence', 'ESRB_intense_violence', 'ESRB_language', 'ESRB_lyrics', 'ESRB_mature_humor', 'ESRB_nudity', 'ESRB_partial_nudity', 'ESRB_real_gambling', 'ESRB_sexual_content', 'ESRB_sexual_themes', 'ESRB_sexual_violence', 'ESRB_simulated_gambling', 'ESRB_strong_language', 'ESRB_strong_lyrics', 'ESRB_strong_sexual content', 'ESRB_suggestive_themes', 'ESRB_tobacco_reference', 'ESRB_use_of alcohol', 'ESRB_use_of drugs', 'ESRB_use_of tobacco', 'ESRB_violence', 'ESRB_violent_references', 'ESRB_animated_violence', 'ESRB_mild_language', 'ESRB_mild_violence', 'ESRB_use_of drugs and alcohol', 'ESRB_drug_and alcohol reference', 'ESRB_mild_suggestive themes', 'ESRB_mild_cartoon violence', 'ESRB_mild_blood', 'ESRB_realistic_blood and gore', 'ESRB_realistic_violence', 'ESRB_alcohol_and tobacco reference', 'ESRB_mature_sexual themes', 'ESRB_mild_animated violence', 'ESRB_mild_sexual themes', 'ESRB_use_of alcohol and tobacco', 'ESRB_animated_blood and gore', 'ESRB_mild_fantasy violence', 'ESRB_mild_lyrics', 'ESRB_realistic_blood', 'PEGI_violence', 'PEGI_sex', 'PEGI_drugs', 'PEGI_fear', 'PEGI_discrimination', 'PEGI_bad_language', 'PEGI_gambling', 'PEGI_online_gameplay', 'PEGI_in_game_purchases', 'CERO_love', 'CERO_sexual_content', 'CERO_violence', 'CERO_horror', 'CERO_drinking_smoking', 'CERO_gambling', 'CERO_crime', 'CERO_controlled_substances', 'CERO_languages_and others', 'GRAC_sexuality', 'GRAC_violence', 'GRAC_fear_horror_threatening', 'GRAC_language', 'GRAC_alcohol_tobacco_drug', 'GRAC_crime_anti_social', 'GRAC_gambling', 'CLASS_IND_violencia', 'CLASS_IND_violencia_extrema', 'CLASS_IND_conteudo_sexual', 'CLASS_IND_nudez', 'CLASS_IND_sexo', 'CLASS_IND_sexo_explicito', 'CLASS_IND_drogas', 'CLASS_IND_drogas_licitas', 'CLASS_IND_drogas_ilicitas', 'CLASS_IND_linguagem_impropria', 'CLASS_IND_atos_criminosos');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "CategoryEnum" AS ENUM('', 'ESRB', 'PEGI', 'CERO', 'USK', 'GRAC', 'CLASS_IND', 'ACB');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "RatingEnum" AS ENUM('', 'Seven', 'Twelve', 'Sixteen', 'Eighteen', 'RP', 'EC', 'E', 'E10', 'T0', 'M1', 'AO2', 'CERO_A3', 'CERO_B4', 'CERO_C5', 'CERO_D6', 'CERO_Z7', 'USK_08', 'USK_69', 'USK_120', 'USK_161', 'USK_182', 'GRAC_ALL3', 'GRAC_Twelve4', 'GRAC_Fifteen5', 'GRAC_Eighteen6', 'GRAC_TESTING7', 'CLASS_IND_L8', 'CLASS_IND_Ten9', 'CLASS_IND_Twelve0', 'CLASS_IND_Fourteen1', 'CLASS_IND_Sixteen2', 'CLASS_IND_Eighteen3', 'ACB_G4', 'ACB_PG5', 'ACB_M6', 'ACB_MA157', 'ACB_R188', 'ACB_RC9');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "CollectionTypeEnum" AS ENUM('', 'MEMBER', 'SPINOFF');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "CompanyDateCategoryEnum" AS ENUM('YYYYMMMMDD', 'YYYYMMMM', 'YYYY', 'YYYYQ1', 'YYYYQ2', 'YYYYQ3', 'YYYYQ4', 'TBD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "GameCategoryEnum" AS ENUM('MAIN_GAME', 'DLC_ADDON', 'EXPANSION', 'BUNDLE', 'STANDALONE_EXPANSION', 'MOD', 'EPISODE', 'SEASON', 'REMAKE', 'REMASTER', 'EXPANDED_GAME', 'PORT', 'FORK', 'PACK', 'UPDATE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "StatusEnum" AS ENUM('RELEASED', 'ALPHA', 'BETA', 'EARLY_ACCESS', 'OFFLINE', 'CANCELLED', 'RUMORED', 'DELISTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "WebsiteCategoryEnum" AS ENUM('', 'official', 'wikia', 'wikipedia', 'facebook', 'twitter', 'twitch', 'instagram', 'youtube', 'iphone', 'ipad', 'android', 'steam', 'reddit', 'itch', 'epicgames', 'gog', 'discord');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "age_rating_content_descriptions" (
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"age_rating_content_descriptions_category" "AgeRatingCDCategoryEnum",
	"description" text,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ageRatings" (
	"category" "CategoryEnum",
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"rating" "RatingEnum",
	"url" text,
	"synopsis" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "alternativeNames" (
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"comment" text,
	"game" bigint,
	"name" text,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artworks" (
	"alpha_channel" boolean,
	"animated" boolean,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"height" integer,
	"igdb_id" integer PRIMARY KEY NOT NULL,
	"image_id" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text,
	"width" integer,
	"game" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "covers" (
	"alpha_channel" boolean,
	"animated" boolean,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"height" integer,
	"igdb_id" integer PRIMARY KEY NOT NULL,
	"image_id" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text,
	"width" integer,
	"game_localization" bigint
);
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
CREATE TABLE IF NOT EXISTS "collections" (
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"checksum" text,
	"game" bigint[],
	"name" text,
	"slug" text,
	"url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"change_date" timestamp,
	"change_date_category" "CompanyDateCategoryEnum",
	"changed_company_id" bigint,
	"checksum" text,
	"country" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"description" text,
	"developed" bigint[],
	"name" text,
	"parent" bigint,
	"published" bigint[],
	"slug" text,
	"start_date" timestamp,
	"start_date_category" "CompanyDateCategoryEnum",
	"url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companyLogos" (
	"alpha_channel" boolean,
	"animated" boolean,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"height" integer,
	"igdb_id" integer,
	"image_id" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text,
	"width" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companyWebsites" (
	"category" "WebsiteCategoryEnum",
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"trusted" boolean,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventLogos" (
	"alpha_channel" boolean,
	"animated" boolean,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"height" integer,
	"igdb_id" integer PRIMARY KEY NOT NULL,
	"image_id" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text,
	"width" integer,
	"igdb_created_at" timestamp,
	"igdb_updated_at" timestamp,
	"event" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"description" text,
	"end_time" timestamp,
	"games" bigint[],
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"live_stream_url" text,
	"name" text NOT NULL,
	"slug" text,
	"start_time" timestamp,
	"time_zone" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"videos" bigint[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "franchises" (
	"checksum" text,
	"igdb_created_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint[],
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text NOT NULL,
	"slug" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gameModes" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text NOT NULL,
	"slug" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"aggregated_rating" double precision,
	"aggregated_rating_count" integer,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"first_release_date" timestamp,
	"game_category" "GameCategoryEnum",
	"hypes" integer,
	"game_id" serial NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text NOT NULL,
	"rating" double precision,
	"rating_count" integer,
	"slug" text,
	"status" "StatusEnum",
	"storyline" text,
	"summary" text,
	"total_rating" double precision,
	"total_rating_count" integer,
	"url" text,
	"version_title" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "games_game_id_unique" UNIQUE("game_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "websites" (
	"category" "WebsiteCategoryEnum",
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"trusted" boolean,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "igdb_id_idx" ON "games" ("igdb_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "slug_idx" ON "games" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "games" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "alternativeNames" ADD CONSTRAINT "alternativeNames_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artworks" ADD CONSTRAINT "artworks_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companies" ADD CONSTRAINT "companies_changed_company_id_companies_igdb_id_fk" FOREIGN KEY ("changed_company_id") REFERENCES "companies"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companies" ADD CONSTRAINT "companies_parent_companies_igdb_id_fk" FOREIGN KEY ("parent") REFERENCES "companies"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventLogos" ADD CONSTRAINT "eventLogos_event_events_igdb_id_fk" FOREIGN KEY ("event") REFERENCES "events"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "websites" ADD CONSTRAINT "websites_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
