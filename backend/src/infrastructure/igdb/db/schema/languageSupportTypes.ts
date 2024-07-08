import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const languageSupportTypesTable = pgTable('languageSupportTypes', {
  checksum: text('checksum').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  name: text('name').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type LanguageSupportTypes =
  typeof languageSupportTypesTable.$inferInsert;
