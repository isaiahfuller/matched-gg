import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { gamesTable } from './games';

export const alternativeNamesTable = pgTable('alternativeNames', {
  checksum: text('checksum'),
  comment: text('comment'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  name: text('name'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type AlternativeNames = typeof alternativeNamesTable.$inferInsert;
