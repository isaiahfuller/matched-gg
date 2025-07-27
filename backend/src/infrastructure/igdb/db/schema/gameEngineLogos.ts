import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const gameEngineLogosTable = pgTable('gameEngineLogos', {
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
});

export type GameEngineLogos = typeof gameEngineLogosTable.$inferInsert;
