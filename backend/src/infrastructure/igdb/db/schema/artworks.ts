import {
  boolean,
  integer,
  pgTable,
  text,
  bigint,
  timestamp,
} from 'drizzle-orm/pg-core';
import { gamesTable } from './games';

export const artworksTable = pgTable('artworks', {
  alphaChannel: boolean('alpha_channel'),
  animated: boolean('animated'),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
  height: integer('height'),
  igdbId: integer('imdb_id'),
  imageId: text('image_id').primaryKey(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
  width: integer('width'),
});

export type Artworks = typeof artworksTable.$inferInsert;
