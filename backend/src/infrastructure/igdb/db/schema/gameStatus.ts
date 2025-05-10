import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const gameStatusTable = pgTable('game_status', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  status: text('status'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type GameStatuses = typeof gameStatusTable.$inferInsert;
