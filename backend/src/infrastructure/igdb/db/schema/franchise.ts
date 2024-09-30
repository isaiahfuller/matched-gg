import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const franchisesTable = pgTable('franchises', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  games: bigint('game', { mode: 'number' }).array(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  name: text('name').notNull(),
  slug: text('slug'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
});

export type Franchises = typeof franchisesTable.$inferInsert;
