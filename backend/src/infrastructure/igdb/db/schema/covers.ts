import { relations } from 'drizzle-orm';
import { bigint, pgTable } from 'drizzle-orm/pg-core';

import { commonArtFields } from './artworks';
import { gamesTable } from './games';

export const coversTable = pgTable('covers', {
  ...commonArtFields,
  game_localization: bigint('game_localization', { mode: 'number' }),
});

export const coverRelations = relations(coversTable, ({ many }) => ({
  games: many(gamesTable),
}));

export type Covers = typeof coversTable.$inferInsert;
