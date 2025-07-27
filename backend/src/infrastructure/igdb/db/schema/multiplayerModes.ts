import { relations } from 'drizzle-orm';
import {
  bigint,
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { gamesTable } from './games';
import { platformsTable } from './platforms';

export const multiplayerModesTable = pgTable('multiplayerModes', {
  campaignCoop: boolean('campaigncoop').notNull(),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  dropIn: boolean('dropin').notNull(),
  game: bigint('game', { mode: 'number' }).notNull(),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  lanCoop: boolean('lancoop').notNull(),
  offlineCoop: boolean('offlinecoop').notNull(),
  offlineCoopMax: integer('offlinecoopmax'),
  offlineMax: integer('offlinemax'),
  onlineCoop: boolean('onlinecoop').notNull(),
  onlineCoopMax: integer('onlinecoopmax'),
  onlineMax: integer('onlinemax'),
  platform: bigint('platform', { mode: 'number' }),
  splitscreen: boolean('splitscreen').notNull(),
  splitscreenOnline: boolean('splitscreenonline'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const multiplayerModesRelations = relations(
  multiplayerModesTable,
  ({ one }) => ({
    game: one(gamesTable, {
      fields: [multiplayerModesTable.game],
      references: [gamesTable.igdbId],
    }),
    platform: one(platformsTable, {
      fields: [multiplayerModesTable.platform],
      references: [platformsTable.igdbId],
    }),
  }),
);

export type MultiplayerModes = typeof multiplayerModesTable.$inferInsert;
