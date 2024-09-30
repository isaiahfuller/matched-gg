import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { coverTable } from './artworks';
import { gamesTable } from './games';
import { regionsTable } from './regions';

export const gameLocalizationsTable = pgTable('gameLocalizations', {
  checksum: text('checksum'),
  cover: bigint('cover', { mode: 'number' }).references(
    () => coverTable.igdbId,
  ),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  name: text('name').notNull(),
  region: bigint('region', { mode: 'number' }).references(
    () => regionsTable.igdbId,
  ),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type GameLocalizations = typeof gameLocalizationsTable.$inferInsert;
