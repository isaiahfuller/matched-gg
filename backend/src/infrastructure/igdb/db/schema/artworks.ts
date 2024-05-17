import {
  boolean,
  integer,
  pgTable,
  text,
  bigint,
  timestamp,
} from 'drizzle-orm/pg-core';
import { gamesTable } from './games';

export const commonArtFields = {
  alphaChannel: boolean('alpha_channel'),
  animated: boolean('animated'),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  height: integer('height'),
  igdbId: integer('igdb_id').primaryKey(),
  imageId: text('image_id'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
  width: integer('width'),
};

export const artworksTable = pgTable('artworks', {
  ...commonArtFields,
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
});
export const coverTable = pgTable('covers', {
  ...commonArtFields,
  game_localization: bigint('game_localization', { mode: 'number' }),
});

export type Artworks = typeof artworksTable.$inferInsert;
export type Covers = typeof coverTable.$inferInsert;
