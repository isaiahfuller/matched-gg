import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const releaseDateStatuses = pgTable('releaseDateStatuses', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  description: text('description'),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  name: text('name').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type ReleaseDateStatuses = typeof releaseDateStatuses.$inferInsert;
