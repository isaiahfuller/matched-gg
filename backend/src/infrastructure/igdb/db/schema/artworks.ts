import { boolean, integer, pgTable, text, bigint } from 'drizzle-orm/pg-core';
import { gamesTable } from './games';

export const artworksTable = pgTable('artworks', {
  alphaChannel: boolean('alpha_channel'),
  animated: boolean('animated'),
  checksum: text('checksum'),
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
  height: integer('height'),
  imageId: text('image_id'),
  url: text('url'),
  width: integer('width'),
});

export type Artworks = typeof artworksTable.$inferInsert;
