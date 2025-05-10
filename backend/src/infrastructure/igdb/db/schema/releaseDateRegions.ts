import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const releaseDateRegionsTable = pgTable('release_date_regions', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  region: text('region'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type ReleaseDateRegions = typeof releaseDateRegionsTable.$inferInsert;
