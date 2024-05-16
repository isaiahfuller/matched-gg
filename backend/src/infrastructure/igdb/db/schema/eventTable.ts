import { pgTable, bigint } from 'drizzle-orm/pg-core';
import { commonArtFields } from './artworks';
import { eventsTable } from './events';

export const eventLogoTable = pgTable('eventLogos', {
  ...commonArtFields,
  event: bigint('event', { mode: 'number' }).references(
    () => eventsTable.igdbId,
  ),
});
