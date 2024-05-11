import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { gamesTable } from './games';

export const collectionsTable = pgTable('collections', {
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  checksum: text('checksum'),
  games: bigint('game', { mode: 'number' })
    .references(() => gamesTable.igdbId)
    .array(),
  name: text('name'),
  slug: text('slug'),
  url: text('url'),
});

export type Collections = typeof collectionsTable.$inferInsert;
