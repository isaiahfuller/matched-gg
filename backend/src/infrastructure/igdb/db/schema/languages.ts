import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const languagesTable = pgTable('languages', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  locale: text('locale'),
  name: text('name').notNull(),
  nativeName: text('native_name').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Languages = typeof languagesTable.$inferInsert;
