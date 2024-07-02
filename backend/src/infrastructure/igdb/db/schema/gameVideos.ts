import { bigint, pgTable, text } from 'drizzle-orm/pg-core';

import { gamesTable } from './games';

export const gameVideosTable = pgTable('gameVideos', {
  checksum: text('checksum'),
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
  videoId: text('url'),
});

export type GameVideos = typeof gameVideosTable.$inferInsert;
