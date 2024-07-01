import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { eventsTable } from './events';

export const eventNetworksTable = pgTable('eventNetworks', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  event: bigint('event', { mode: 'number' }).references(
    () => eventsTable.igdbId,
  ),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  networkType: bigint('network_type', { mode: 'number' }), //TODO: Add reference once networksTable is added
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
});

export type EventNetworks = typeof eventNetworksTable.$inferInsert;
