import { bigint, pgTable } from 'drizzle-orm/pg-core';

import { commonArtFields } from './artworks';
import { gamesTable } from './games';

export const screenshotsTable = pgTable('screenshots', {
  ...commonArtFields,
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
});

export type Screenshots = typeof screenshotsTable.$inferInsert;
