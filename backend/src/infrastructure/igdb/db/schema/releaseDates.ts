import { pgEnum, pgTable } from 'drizzle-orm/pg-core';
import { bigint, integer, text, timestamp } from 'drizzle-orm/pg-core/columns';

import { gamesTable } from './games';
import { platformsTable } from './platforms';
import { releaseDateStatusesTable } from './releaseDateStatuses';

export const ReleaseDateRegionCategoryPGEnum = pgEnum(
  'ReleaseDateCategoryEnum',
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

export const ReleaseDateRegionPGEnum = pgEnum('ReleaseDateRegionEnum', [
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
]);

export const releaseDatesTable = pgTable('releaseDates', {
  category: ReleaseDateRegionCategoryPGEnum('category'),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  date: timestamp('date'),
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
  human: text('human'),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  m: integer('m'),
  platform: bigint('platform', { mode: 'number' }).references(
    () => platformsTable.igdbId,
  ),
  region: ReleaseDateRegionPGEnum('region'),
  status: bigint('status', { mode: 'number' }).references(
    () => releaseDateStatusesTable.igdbId,
  ),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  y: integer('y'),
});

export type ReleaseDates = typeof releaseDatesTable.$inferInsert;
