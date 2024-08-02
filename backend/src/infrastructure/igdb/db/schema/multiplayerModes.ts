import {
  bigint,
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { gamesTable } from './games';

export const multiplayerModesTable = pgTable('multiplayerModes', {
  campaignCoop: boolean('campaigncoop').notNull(),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  dropIn: boolean('dropin').notNull(),
  game: bigint('game', { mode: 'number' })
    .notNull()
    .references(() => gamesTable.igdbId),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  lanCoop: boolean('lancoop').notNull(),
  offlineCoop: boolean('offlinecoop').notNull(),
  offlineCoopMax: integer('offlinecoopmax').notNull(),
  offlineMax: integer('offlinemax').notNull(),
  onlineCoop: boolean('onlinecoop').notNull(),
  onlineCoopMax: integer('onlinecoopmax').notNull(),
  onlineMax: integer('onlinemax').notNull(),
  platform: bigint('platform', { mode: 'number' }).notNull(), // reference platform
  splitscreen: boolean('splitscreen').notNull(),
  splitscreenOnline: boolean('splitscreenonline').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type MultiplayerModes = typeof multiplayerModesTable.$inferInsert;
