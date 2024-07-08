import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { gamesTable } from './games';

export const languageSupportsTable = pgTable('languageSupports', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  language: bigint('language', { mode: 'number' }), // reference language
  languageSupportType: bigint('language_support_type', {
    mode: 'number',
  }), // reference languageSupportType
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
export type LanguageSupports = typeof languageSupportsTable.$inferInsert;
