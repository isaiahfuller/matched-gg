import { relations } from 'drizzle-orm';
import {
  bigint,
  index,
  integer,
  pgTable,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';
import { users } from 'src/infrastructure/local/db/schema/users';

import { igdbSteamConnect } from './igdbSteamConnect';

export const userOwnedGames = pgTable(
  'steam_user_owned_games',
  {
    createdAt: timestamp('created_at').notNull().defaultNow(),
    lastPlayed: timestamp('last_played'),
    playtime: integer('playtime').notNull(),
    playtimeDeck: integer('playtime_deck'),
    playtimeDisconnected: integer('playtime_disconnected'),
    playtimeLinux: integer('playtime_linux'),
    playtimeMac: integer('playtime_mac'),
    playtimeWindows: integer('playtime_windows'),
    steamId: bigint('steam_id', { mode: 'number' }).notNull(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    playtimeIdx: index('playtime_idx').on(t.playtime.desc()),
    unq: unique().on(t.steamId, t.userId),
  }),
);

export const userOwnedGamesRelations = relations(userOwnedGames, ({ one }) => ({
  steam: one(igdbSteamConnect, {
    fields: [userOwnedGames.steamId],
    references: [igdbSteamConnect.steamId],
  }),
  user: one(users, {
    fields: [userOwnedGames.userId],
    references: [users.id],
  }),
}));

export type UserOwnedGames = typeof userOwnedGames.$inferInsert;
