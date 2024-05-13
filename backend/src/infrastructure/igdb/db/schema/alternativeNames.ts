import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { gamesTable } from './games';

export const alternativeNamesTable = pgTable('alternativeNames', {
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  comment: text('comment'),
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
  name: text('name'),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type AlternativeNames = typeof alternativeNamesTable.$inferInsert;
