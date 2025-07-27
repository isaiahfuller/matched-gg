import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { platformVersionsTable } from './platformVersions';
import { platformsTable } from './platforms';

export const platformLogosTable = pgTable('platformLogos', {
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

export const platformLogosRelations = relations(
  platformLogosTable,
  ({ many }) => ({
    platformVersions: many(platformVersionsTable),
    platforms: many(platformsTable),
  }),
);

export type PlatformLogos = typeof platformLogosTable.$inferInsert;
