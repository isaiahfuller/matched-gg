import { relations } from 'drizzle-orm';
import {
  bigint,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { platformVersionsTable } from './platformVersions';

export const PlatformVersionReleaseDateCategoryPGEnum = pgEnum(
  'PlatformVersionReleaseDateCategoryEnum',
  [
    'YYYYMMMMDD',
    'YYYYMMMM',
    'YYYY',
    'YYYYQ1',
    'YYYYQ2',
    'YYYYQ3',
    'YYYYQ4',
    'TBD',
  ],
);

export const PlatformVersionReleaseDateRegionPGEnum = pgEnum(
  'PlatformVersionReleaseDateRegionEnum',
  [
    'europe',
    'north_america',
    'australia',
    'new_zealand',
    'japan',
    'china',
    'asia',
    'worldwide',
    'korea',
    'brazil',
  ],
);

export const platformVersionReleaseDatesTable = pgTable(
  'platformVersionReleaseDates',
  {
    category: PlatformVersionReleaseDateCategoryPGEnum('category'),
    checksum: text('checksum'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    date: timestamp('date'),
    human: text('human'),
    igdbCreatedAt: timestamp('igdb_created_at'),
    igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
    igdbUpdatedAt: timestamp('igdb_updated_at'),
    m: integer('m'),
    platformVersion: bigint('platform_version', { mode: 'number' }),
    region: PlatformVersionReleaseDateRegionPGEnum('region'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    y: integer('y'),
  },
);

export const platformVersionReleaseDateRelations = relations(
  platformVersionReleaseDatesTable,
  ({ one }) => ({
    platformVersion: one(platformVersionsTable, {
      fields: [platformVersionReleaseDatesTable.platformVersion],
      references: [platformVersionsTable.igdbId],
    }),
  }),
);

export type PlatformVersionReleaseDates =
  typeof platformVersionReleaseDatesTable.$inferInsert;
