import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { gamesTable } from './games';

export const gameVideosTable = pgTable('gameVideos', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  videoId: text('url'),
});

export type GameVideos = typeof gameVideosTable.$inferInsert;
