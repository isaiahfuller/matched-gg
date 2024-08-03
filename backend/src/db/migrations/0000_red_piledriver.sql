DO $$ BEGIN
 CREATE TYPE "public"."AgeRatingCDCategoryEnum" AS ENUM('', 'ESRB_alcohol_reference', 'ESRB_animated_blood', 'ESRB_blood', 'ESRB_blood_and gore', 'ESRB_cartoon_violence', 'ESRB_comic_mischief', 'ESRB_crude_humor', 'ESRB_drug_reference', 'ESRB_fantasy_violence', 'ESRB_intense_violence', 'ESRB_language', 'ESRB_lyrics', 'ESRB_mature_humor', 'ESRB_nudity', 'ESRB_partial_nudity', 'ESRB_real_gambling', 'ESRB_sexual_content', 'ESRB_sexual_themes', 'ESRB_sexual_violence', 'ESRB_simulated_gambling', 'ESRB_strong_language', 'ESRB_strong_lyrics', 'ESRB_strong_sexual content', 'ESRB_suggestive_themes', 'ESRB_tobacco_reference', 'ESRB_use_of alcohol', 'ESRB_use_of drugs', 'ESRB_use_of tobacco', 'ESRB_violence', 'ESRB_violent_references', 'ESRB_animated_violence', 'ESRB_mild_language', 'ESRB_mild_violence', 'ESRB_use_of drugs and alcohol', 'ESRB_drug_and alcohol reference', 'ESRB_mild_suggestive themes', 'ESRB_mild_cartoon violence', 'ESRB_mild_blood', 'ESRB_realistic_blood and gore', 'ESRB_realistic_violence', 'ESRB_alcohol_and tobacco reference', 'ESRB_mature_sexual themes', 'ESRB_mild_animated violence', 'ESRB_mild_sexual themes', 'ESRB_use_of alcohol and tobacco', 'ESRB_animated_blood and gore', 'ESRB_mild_fantasy violence', 'ESRB_mild_lyrics', 'ESRB_realistic_blood', 'PEGI_violence', 'PEGI_sex', 'PEGI_drugs', 'PEGI_fear', 'PEGI_discrimination', 'PEGI_bad_language', 'PEGI_gambling', 'PEGI_online_gameplay', 'PEGI_in_game_purchases', 'CERO_love', 'CERO_sexual_content', 'CERO_violence', 'CERO_horror', 'CERO_drinking_smoking', 'CERO_gambling', 'CERO_crime', 'CERO_controlled_substances', 'CERO_languages_and others', 'GRAC_sexuality', 'GRAC_violence', 'GRAC_fear_horror_threatening', 'GRAC_language', 'GRAC_alcohol_tobacco_drug', 'GRAC_crime_anti_social', 'GRAC_gambling', 'CLASS_IND_violencia', 'CLASS_IND_violencia_extrema', 'CLASS_IND_conteudo_sexual', 'CLASS_IND_nudez', 'CLASS_IND_sexo', 'CLASS_IND_sexo_explicito', 'CLASS_IND_drogas', 'CLASS_IND_drogas_licitas', 'CLASS_IND_drogas_ilicitas', 'CLASS_IND_linguagem_impropria', 'CLASS_IND_atos_criminosos');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."CategoryEnum" AS ENUM('', 'ESRB', 'PEGI', 'CERO', 'USK', 'GRAC', 'CLASS_IND', 'ACB');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."RatingEnum" AS ENUM('', 'Seven', 'Twelve', 'Sixteen', 'Eighteen', 'RP', 'EC', 'E', 'E10', 'T0', 'M1', 'AO2', 'CERO_A3', 'CERO_B4', 'CERO_C5', 'CERO_D6', 'CERO_Z7', 'USK_08', 'USK_69', 'USK_120', 'USK_161', 'USK_182', 'GRAC_ALL3', 'GRAC_Twelve4', 'GRAC_Fifteen5', 'GRAC_Eighteen6', 'GRAC_TESTING7', 'CLASS_IND_L8', 'CLASS_IND_Ten9', 'CLASS_IND_Twelve0', 'CLASS_IND_Fourteen1', 'CLASS_IND_Sixteen2', 'CLASS_IND_Eighteen3', 'ACB_G4', 'ACB_PG5', 'ACB_M6', 'ACB_MA157', 'ACB_R188', 'ACB_RC9');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."CollectionTypeEnum" AS ENUM('', 'MEMBER', 'SPINOFF');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."CompanyDateCategoryEnum" AS ENUM('YYYYMMMMDD', 'YYYYMMMM', 'YYYY', 'YYYYQ1', 'YYYYQ2', 'YYYYQ3', 'YYYYQ4', 'TBD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."ExternalGameMediaEnum" AS ENUM('', 'DIGITAL', 'PHYSICAL');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."GameCategoryEnum" AS ENUM('MAIN_GAME', 'DLC_ADDON', 'EXPANSION', 'BUNDLE', 'STANDALONE_EXPANSION', 'MOD', 'EPISODE', 'SEASON', 'REMAKE', 'REMASTER', 'EXPANDED_GAME', 'PORT', 'FORK', 'PACK', 'UPDATE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."StatusEnum" AS ENUM('RELEASED', 'ALPHA', 'BETA', 'EARLY_ACCESS', 'OFFLINE', 'CANCELLED', 'RUMORED', 'DELISTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."GameVersionFeatureEnum" AS ENUM('boolean', 'description');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."GameVersionFeatureValueIncludedFeatureEnum" AS ENUM('NOT_INCLUDED', 'INCLUDED', 'PRE_ORDER_ONLY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."PlatformCategoryEnum" AS ENUM('console', 'arcade', 'platform', 'operating_system', 'portable_console', 'computer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."PlatformVersionReleaseDateCategoryEnum" AS ENUM('YYYYMMMMDD', 'YYYYMMMM', 'YYYY', 'YYYYQ1', 'YYYYQ2', 'YYYYQ3', 'YYYYQ4', 'TBD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."PlatformVersionReleaseDateRegionEnum" AS ENUM('europe', 'north_america', 'australia', 'new_zealand', 'japan', 'china', 'asia', 'worldwide', 'korea', 'brazil');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."PlatformWebsiteCategoryEnum" AS ENUM('official', 'wikia', 'wikipedia', 'facebook', 'twitter', 'twitch', 'instagram', 'youtube', 'iphone', 'ipad', 'android', 'steam', 'reddit', 'discord', 'google_plus', 'tumblr', 'linkedin', 'pinterest', 'soundcloud');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."PopularitySourceEnum" AS ENUM('igdb');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."ReleaseDateCategoryEnum" AS ENUM('YYYYMMMMDD', 'YYYYMMMM', 'YYYY', 'YYYYQ1', 'YYYYQ2', 'YYYYQ3', 'YYYYQ4', 'TBD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."ReleaseDateRegionEnum" AS ENUM('europe', 'north_america', 'australia', 'new_zealand', 'japan', 'china', 'asia', 'worldwide', 'korea', 'brazil');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."WebsiteCategoryEnum" AS ENUM('blank1', 'official', 'wikia', 'wikipedia', 'facebook', 'twitter', 'twitch', 'blank2', 'instagram', 'youtube', 'iphone', 'ipad', 'android', 'steam', 'reddit', 'itch', 'epicgames', 'gog', 'discord');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "age_rating_content_descriptions" (
	"age_rating_content_descriptions_category" "AgeRatingCDCategoryEnum",
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"description" text,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
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
	"checksum" text,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"name" text,
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
	"checksum" text,
	"game" bigint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"type" "CollectionTypeEnum",
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collections" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint[],
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text,
	"slug" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
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
	"description" text,
	"developed" bigint[],
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text,
	"parent" bigint,
	"published" bigint[],
	"slug" text,
	"start_date" timestamp,
	"start_date_category" "CompanyDateCategoryEnum",
	"updated_at" timestamp DEFAULT now() NOT NULL,
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
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"trusted" boolean,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text,
	"category" "WebsiteCategoryEnum"
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
	"event" bigint,
	"igdb_created_at" timestamp,
	"igdb_updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventNetworks" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"event" bigint,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"network_type" bigint,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text
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
CREATE TABLE IF NOT EXISTS "externalGames" (
	"category" integer,
	"checksum" text,
	"countries" integer[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"media" "ExternalGameMediaEnum",
	"name" text,
	"platform" bigint,
	"uid" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text,
	"year" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "franchises" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint[],
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text NOT NULL,
	"slug" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gameEngineLogos" (
	"alpha_channel" boolean,
	"animated" boolean,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"height" integer,
	"igdb_id" integer PRIMARY KEY NOT NULL,
	"image_id" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text,
	"width" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gameEngines" (
	"checksum" text,
	"companies" bigint[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"description" text,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"logo" bigint,
	"name" text NOT NULL,
	"platforms" bigint[],
	"slug" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gameLocalizations" (
	"checksum" text,
	"cover" bigint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text NOT NULL,
	"region" bigint,
	"updated_at" timestamp DEFAULT now() NOT NULL
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
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text,
	"version_title" text,
	CONSTRAINT "games_game_id_unique" UNIQUE("game_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gameVersionFeatures" (
	"category" "GameVersionFeatureEnum" NOT NULL,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"description" text NOT NULL,
	"igdb_id" serial NOT NULL,
	"position" integer,
	"title" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"values" bigint[],
	CONSTRAINT "gameVersionFeatures_igdb_id_unique" UNIQUE("igdb_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gameVersionFeatureValues" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint NOT NULL,
	"game_feature" bigint,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"included_feature" "GameVersionFeatureValueIncludedFeatureEnum",
	"note" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gameVersions" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"features" bigint[],
	"game" bigint,
	"games" bigint[],
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gameVideos" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "genres" (
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
CREATE TABLE IF NOT EXISTS "involvedCompanies" (
	"checksum" text,
	"company" bigint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"developer" boolean,
	"game" bigint,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"porting" boolean,
	"publisher" boolean,
	"supporting" boolean,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keywords" (
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
CREATE TABLE IF NOT EXISTS "languages" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"locale" text,
	"name" text NOT NULL,
	"native_name" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "languageSupports" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"language" bigint,
	"language_support_type" bigint,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "languageSupportTypes" (
	"checksum" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "multiplayerModes" (
	"campaigncoop" boolean NOT NULL,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"dropin" boolean NOT NULL,
	"game" bigint NOT NULL,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"lancoop" boolean NOT NULL,
	"offlinecoop" boolean NOT NULL,
	"offlinecoopmax" integer NOT NULL,
	"offlinemax" integer NOT NULL,
	"onlinecoop" boolean NOT NULL,
	"onlinecoopmax" integer NOT NULL,
	"onlinemax" integer NOT NULL,
	"platform" bigint NOT NULL,
	"splitscreen" boolean NOT NULL,
	"splitscreenonline" boolean NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "networkTypes" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"event_networks" bigint[],
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "platformFamilies" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "platformLogos" (
	"alpha_channel" boolean,
	"animated" boolean,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"height" integer,
	"igdb_id" integer PRIMARY KEY NOT NULL,
	"image_id" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text,
	"width" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "platforms" (
	"abbreviation" text,
	"alternative_name" text,
	"category" "PlatformCategoryEnum",
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"generation" integer,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text NOT NULL,
	"platform_family" bigint,
	"platform_logo" bigint,
	"slug" text,
	"summary" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text,
	"versions" bigint,
	"websites" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "platformVersionCompanies" (
	"checksum" text,
	"comment" text,
	"company" bigint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"developer" boolean,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"manufacturer" boolean,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "platformVersionReleaseDates" (
	"category" "PlatformVersionReleaseDateCategoryEnum",
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"date" timestamp,
	"human" text,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"m" integer,
	"platform_version" bigint,
	"region" "PlatformVersionReleaseDateRegionEnum",
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"y" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "platformVersions" (
	"checksum" text,
	"companies" bigint[],
	"connectivity" text,
	"cpu" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"graphics" text,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"main_manufacturer" bigint,
	"media" text,
	"memory" text,
	"name" text NOT NULL,
	"os" text,
	"output" text,
	"platform_logo" bigint,
	"platform_version_release_dates" bigint[],
	"resolutions" text,
	"slug" text,
	"sound" text,
	"storage" text,
	"summary" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "platformWebsites" (
	"category" "PlatformWebsiteCategoryEnum",
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"trusted" boolean,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "playerPerspectives" (
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
CREATE TABLE IF NOT EXISTS "popularityPrimitives" (
	"calculated_at" timestamp,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game_id" bigint,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"popularity_source" "PopularitySourceEnum",
	"popularity_type" bigint,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"value" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "popularityTypes" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text NOT NULL,
	"popularity_source" "PopularitySourceEnum",
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "regions" (
	"category" text,
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"identifier" text,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "releaseDates" (
	"category" "ReleaseDateCategoryEnum",
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"date" timestamp,
	"game" bigint,
	"human" text,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"m" integer,
	"platform" bigint,
	"region" "ReleaseDateRegionEnum",
	"status" bigint,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"y" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "releaseDateStatuses" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"description" text,
	"igdb_created_at" timestamp,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"igdb_updated_at" timestamp,
	"name" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "screenshots" (
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
CREATE TABLE IF NOT EXISTS "websites" (
	"checksum" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"game" bigint,
	"igdb_id" bigint PRIMARY KEY NOT NULL,
	"trusted" boolean,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"url" text,
	"category" "WebsiteCategoryEnum"
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "alternativeNames" ADD CONSTRAINT "alternativeNames_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artworks" ADD CONSTRAINT "artworks_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collectionMemberships" ADD CONSTRAINT "collectionMemberships_game_collections_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."collections"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collectionMemberships" ADD CONSTRAINT "collectionMemberships_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companies" ADD CONSTRAINT "companies_changed_company_id_companies_igdb_id_fk" FOREIGN KEY ("changed_company_id") REFERENCES "public"."companies"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companies" ADD CONSTRAINT "companies_parent_companies_igdb_id_fk" FOREIGN KEY ("parent") REFERENCES "public"."companies"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventLogos" ADD CONSTRAINT "eventLogos_event_events_igdb_id_fk" FOREIGN KEY ("event") REFERENCES "public"."events"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventNetworks" ADD CONSTRAINT "eventNetworks_event_events_igdb_id_fk" FOREIGN KEY ("event") REFERENCES "public"."events"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventNetworks" ADD CONSTRAINT "eventNetworks_network_type_networkTypes_igdb_id_fk" FOREIGN KEY ("network_type") REFERENCES "public"."networkTypes"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "externalGames" ADD CONSTRAINT "externalGames_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "externalGames" ADD CONSTRAINT "externalGames_platform_platforms_igdb_id_fk" FOREIGN KEY ("platform") REFERENCES "public"."platforms"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gameEngines" ADD CONSTRAINT "gameEngines_logo_gameEngineLogos_igdb_id_fk" FOREIGN KEY ("logo") REFERENCES "public"."gameEngineLogos"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gameLocalizations" ADD CONSTRAINT "gameLocalizations_cover_covers_igdb_id_fk" FOREIGN KEY ("cover") REFERENCES "public"."covers"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gameLocalizations" ADD CONSTRAINT "gameLocalizations_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gameLocalizations" ADD CONSTRAINT "gameLocalizations_region_regions_igdb_id_fk" FOREIGN KEY ("region") REFERENCES "public"."regions"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gameVersionFeatureValues" ADD CONSTRAINT "gameVersionFeatureValues_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gameVersionFeatureValues" ADD CONSTRAINT "gameVersionFeatureValues_game_feature_gameVersionFeatures_igdb_id_fk" FOREIGN KEY ("game_feature") REFERENCES "public"."gameVersionFeatures"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gameVersions" ADD CONSTRAINT "gameVersions_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gameVideos" ADD CONSTRAINT "gameVideos_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "involvedCompanies" ADD CONSTRAINT "involvedCompanies_company_companies_igdb_id_fk" FOREIGN KEY ("company") REFERENCES "public"."companies"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "involvedCompanies" ADD CONSTRAINT "involvedCompanies_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "languageSupports" ADD CONSTRAINT "languageSupports_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "languageSupports" ADD CONSTRAINT "languageSupports_language_languages_igdb_id_fk" FOREIGN KEY ("language") REFERENCES "public"."languages"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "languageSupports" ADD CONSTRAINT "languageSupports_language_support_type_languageSupportTypes_igdb_id_fk" FOREIGN KEY ("language_support_type") REFERENCES "public"."languageSupportTypes"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiplayerModes" ADD CONSTRAINT "multiplayerModes_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "multiplayerModes" ADD CONSTRAINT "multiplayerModes_platform_platforms_igdb_id_fk" FOREIGN KEY ("platform") REFERENCES "public"."platforms"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "platforms" ADD CONSTRAINT "platforms_platform_family_platformFamilies_igdb_id_fk" FOREIGN KEY ("platform_family") REFERENCES "public"."platformFamilies"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "platforms" ADD CONSTRAINT "platforms_platform_logo_platformLogos_igdb_id_fk" FOREIGN KEY ("platform_logo") REFERENCES "public"."platformLogos"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "platforms" ADD CONSTRAINT "platforms_versions_platformVersions_igdb_id_fk" FOREIGN KEY ("versions") REFERENCES "public"."platformVersions"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "platforms" ADD CONSTRAINT "platforms_websites_platformWebsites_igdb_id_fk" FOREIGN KEY ("websites") REFERENCES "public"."platformWebsites"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "platformVersionCompanies" ADD CONSTRAINT "platformVersionCompanies_company_companies_igdb_id_fk" FOREIGN KEY ("company") REFERENCES "public"."companies"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "platformVersionReleaseDates" ADD CONSTRAINT "platformVersionReleaseDates_platform_version_platformVersions_igdb_id_fk" FOREIGN KEY ("platform_version") REFERENCES "public"."platformVersions"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "platformVersions" ADD CONSTRAINT "platformVersions_main_manufacturer_platformVersionCompanies_igdb_id_fk" FOREIGN KEY ("main_manufacturer") REFERENCES "public"."platformVersionCompanies"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "platformVersions" ADD CONSTRAINT "platformVersions_platform_logo_platformLogos_igdb_id_fk" FOREIGN KEY ("platform_logo") REFERENCES "public"."platformLogos"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "popularityPrimitives" ADD CONSTRAINT "popularityPrimitives_game_id_games_igdb_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "popularityPrimitives" ADD CONSTRAINT "popularityPrimitives_popularity_type_popularityTypes_igdb_id_fk" FOREIGN KEY ("popularity_type") REFERENCES "public"."popularityTypes"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "releaseDates" ADD CONSTRAINT "releaseDates_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "releaseDates" ADD CONSTRAINT "releaseDates_platform_platforms_igdb_id_fk" FOREIGN KEY ("platform") REFERENCES "public"."platforms"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "releaseDates" ADD CONSTRAINT "releaseDates_status_releaseDateStatuses_igdb_id_fk" FOREIGN KEY ("status") REFERENCES "public"."releaseDateStatuses"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "screenshots" ADD CONSTRAINT "screenshots_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "websites" ADD CONSTRAINT "websites_game_games_igdb_id_fk" FOREIGN KEY ("game") REFERENCES "public"."games"("igdb_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "igdb_uid_idx" ON "externalGames" ("uid");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "url_idx" ON "externalGames" ("url");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "games" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "slug_idx" ON "games" ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "igdb_id_idx" ON "games" ("igdb_id");