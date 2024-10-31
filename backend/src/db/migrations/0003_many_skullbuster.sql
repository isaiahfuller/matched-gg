ALTER TABLE "platformVersionReleaseDates" DROP CONSTRAINT "platformVersionReleaseDates_platform_version_platformVersions_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "platformVersions" DROP CONSTRAINT "platformVersions_main_manufacturer_platformVersionCompanies_igdb_id_fk";
--> statement-breakpoint
ALTER TABLE "platformVersions" DROP CONSTRAINT "platformVersions_platform_logo_platformLogos_igdb_id_fk";
