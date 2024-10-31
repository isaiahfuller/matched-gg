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
  game: bigint('game', { mode: 'number' }),
});

export const artworkRelations = relations(artworksTable, ({ one }) => ({
  game: one(gamesTable, {
    fields: [artworksTable.game],
    references: [gamesTable.igdbId],
  }),
}));

export type Artworks = typeof artworksTable.$inferInsert;
