import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const networkTypesTable = pgTable('networkTypes', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  eventNetworks: bigint('event_networks', { mode: 'number' }).notNull().array(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  name: text('name').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type NetworkTypes = typeof networkTypesTable.$inferInsert;
