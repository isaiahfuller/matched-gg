import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { gamesTable } from './games';

export const gameVersionsTable = pgTable('gameVersions', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  features: bigint('features', { mode: 'number' }), //TODO: Add reference once gameVersionFeaturesTable is added
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
  games: bigint('games', { mode: 'number' })
    .array()
    .references(() => gamesTable.igdbId),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
});

export type GameVersions = typeof gameVersionsTable.$inferInsert;
