import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const platformTypesTable = pgTable('platform_types', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  name: text('name'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type PlatformTypes = typeof platformTypesTable.$inferInsert;
