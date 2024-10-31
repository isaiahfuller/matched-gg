import { relations } from 'drizzle-orm';
import { bigint, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { gamesTable } from 'src/infrastructure/igdb/db/schema/games';

export const IgdbSteamConnect = pgTable('igdb_steam_connect', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbId: bigint('igdb_id', { mode: 'number' }).notNull(),
  steamId: bigint('steam_id', { mode: 'number' }).primaryKey(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const igdbSteamRelations = relations(IgdbSteamConnect, ({ one }) => ({
  igdbGame: one(gamesTable, {
    fields: [IgdbSteamConnect.igdbId],
    references: [gamesTable.igdbId],
  }),
}));

export type IgdbSteamConnect = typeof IgdbSteamConnect.$inferInsert;
