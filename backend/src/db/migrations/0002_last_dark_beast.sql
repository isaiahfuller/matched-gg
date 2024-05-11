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
