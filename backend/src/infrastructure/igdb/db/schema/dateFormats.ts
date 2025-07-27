import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const dateFormatTable = pgTable('date_format', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  format: text('format'),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type DateFormats = typeof dateFormatTable.$inferInsert;
