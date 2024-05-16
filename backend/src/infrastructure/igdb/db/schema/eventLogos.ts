import { pgTable, bigint, timestamp } from 'drizzle-orm/pg-core';
import { commonArtFields } from './artworks';
import { eventsTable } from './events';

export const eventLogoTable = pgTable('eventLogos', {
  ...commonArtFields,
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  event: bigint('event', { mode: 'number' }).references(
    () => eventsTable.igdbId,
  ),
});

export type EventLogos = typeof eventLogoTable.$inferInsert;
