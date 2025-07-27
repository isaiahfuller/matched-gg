import {
  bigint,
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { eventsTable } from './events';

export const eventLogoTable = pgTable('eventLogos', {
  alphaChannel: boolean('alpha_channel'),
  animated: boolean('animated'),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  event: bigint('event', { mode: 'number' }).references(
    () => eventsTable.igdbId,
  ),
  height: integer('height'),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: integer('igdb_id').primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  imageId: text('image_id'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
  width: integer('width'),
});

export type EventLogos = typeof eventLogoTable.$inferInsert;
