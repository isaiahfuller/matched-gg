import { relations } from 'drizzle-orm';
import { bigint, pgTable } from 'drizzle-orm/pg-core';

import { commonArtFields } from './artworks';
import { gamesTable } from './games';

export const coversTable = pgTable('covers', {
  ...commonArtFields,
  game: bigint('game', { mode: 'number' }),
  gameLocalization: bigint('game_localization', { mode: 'number' }),
});

export const coverRelations = relations(coversTable, ({ one }) => ({
  game: one(gamesTable, {
    fields: [coversTable.game, coversTable.gameLocalization],
    references: [gamesTable.cover, gamesTable.cover],
  }),
}));

export type Covers = typeof coversTable.$inferInsert;
