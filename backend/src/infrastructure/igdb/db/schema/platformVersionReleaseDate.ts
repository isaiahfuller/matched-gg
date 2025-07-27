import { relations } from 'drizzle-orm';
import { bigint, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { dateFormatTable } from './dateFormats';
import { platformVersionsTable } from './platformVersions';
import { releaseDateRegionsTable } from './releaseDateRegions';

export const platformVersionReleaseDatesTable = pgTable(
  'platformVersionReleaseDates',
  {
    checksum: text('checksum'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    date: timestamp('date'),
    dateFormat: bigint('date_format', { mode: 'number' }),
    human: text('human'),
    igdbCreatedAt: timestamp('igdb_created_at'),
    igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
    igdbUpdatedAt: timestamp('igdb_updated_at'),
    m: integer('m'),
    platformVersion: bigint('platform_version', { mode: 'number' }),
    releaseRegion: bigint('release_region', { mode: 'number' }),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    y: integer('y'),
  },
);

export const platformVersionReleaseDateRelations = relations(
  platformVersionReleaseDatesTable,
  ({ one }) => ({
    dateFormat: one(dateFormatTable, {
      fields: [platformVersionReleaseDatesTable.dateFormat],
      references: [dateFormatTable.igdbId],
    }),
    platformVersion: one(platformVersionsTable, {
      fields: [platformVersionReleaseDatesTable.platformVersion],
      references: [platformVersionsTable.igdbId],
    }),
    releaseRegion: one(releaseDateRegionsTable, {
      fields: [platformVersionReleaseDatesTable.releaseRegion],
      references: [releaseDateRegionsTable.igdbId],
    }),
  }),
);

export type PlatformVersionReleaseDates =
  typeof platformVersionReleaseDatesTable.$inferInsert;
