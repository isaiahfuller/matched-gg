import { bigint, pgTable, timestamp } from 'drizzle-orm/pg-core';

import { commonArtFields } from './artworks';
import { eventsTable } from './events';

export const eventLogoTable = pgTable('eventLogos', {
  ...commonArtFields,
  event: bigint('event', { mode: 'number' }).references(
    () => eventsTable.igdbId,
  ),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
});

export type EventLogos = typeof eventLogoTable.$inferInsert;
