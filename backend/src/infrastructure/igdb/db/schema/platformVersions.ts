import { relations } from 'drizzle-orm';
import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { platformLogosTable } from './platformLogos';
import { platformVersionCompaniesTable } from './platformVersionCompanies';
import { platformVersionReleaseDatesTable } from './platformVersionReleaseDate';

export const platformVersionsTable = pgTable('platformVersions', {
  checksum: text('checksum'),
  companies: bigint('companies', { mode: 'number' }).array(),
  connectivity: text('connectivity'),
  cpu: text('cpu'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  graphics: text('graphics'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  mainManufacturer: bigint('main_manufacturer', { mode: 'number' }),
  media: text('media'),
  memory: text('memory'),
  name: text('name').notNull(),
  os: text('os'),
  output: text('output'),
  platformLogo: bigint('platform_logo', { mode: 'number' }),
  platformVersionReleaseDates: bigint('platform_version_release_dates', {
    mode: 'number',
  }).array(),
  resolutions: text('resolutions'),
  slug: text('slug'),
  sound: text('sound'),
  storage: text('storage'),
  summary: text('summary'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
});

export const platformVersionRelations = relations(
  platformVersionsTable,
  ({ many, one }) => ({
    mainManufacturer: one(platformVersionCompaniesTable, {
      fields: [platformVersionsTable.mainManufacturer],
      references: [platformVersionCompaniesTable.igdbId],
    }),
    platformLogo: one(platformLogosTable, {
      fields: [platformVersionsTable.platformLogo],
      references: [platformLogosTable.igdbId],
    }),
    platformVersionReleaseDates: many(platformVersionReleaseDatesTable),
  }),
);

export type PlatformVersions = typeof platformVersionsTable.$inferInsert;
