import { relations } from 'drizzle-orm';
import {
  bigint,
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { gamesTable } from './games';

export const coversTable = pgTable('covers', {
  alphaChannel: boolean('alpha_channel'),
  animated: boolean('animated'),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  game: bigint('game', { mode: 'number' }),
  gameLocalization: bigint('game_localization', { mode: 'number' }),
  height: integer('height'),
  igdbId: integer('igdb_id').primaryKey(),
  imageId: text('image_id'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
  width: integer('width'),
});

export const coverRelations = relations(coversTable, ({ one }) => ({
  game: one(gamesTable, {
    fields: [coversTable.game, coversTable.gameLocalization],
    references: [gamesTable.cover, gamesTable.cover],
  }),
}));

export type Covers = typeof coversTable.$inferInsert;
