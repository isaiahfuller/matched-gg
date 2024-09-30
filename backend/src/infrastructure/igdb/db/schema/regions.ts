import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const regionsTable = pgTable('regions', {
  category: text('category'),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  identifier: text('identifier'),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  name: text('name').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Regions = typeof regionsTable.$inferInsert;
