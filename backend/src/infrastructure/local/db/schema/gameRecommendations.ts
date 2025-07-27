import { relations } from 'drizzle-orm';
import {
  bigint,
  integer,
  pgTable,
  primaryKey,
  timestamp,
} from 'drizzle-orm/pg-core';
import { gamesTable } from 'src/infrastructure/igdb/db/schema/games';

import { users } from './users';

export const gameRecommendations = pgTable(
  'game_recommendations',
  {
    gameId: bigint('igdb_id', { mode: 'number' })
      .notNull()
      .references(() => gamesTable.igdbId),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => ({ pk: primaryKey({ columns: [table.userId, table.gameId] }) }),
);

export const gameRecommendationsRelations = relations(
  gameRecommendations,
  ({ one }) => ({
    game: one(gamesTable, {
      fields: [gameRecommendations.gameId],
      references: [gamesTable.igdbId],
    }),
    user: one(users, {
      fields: [gameRecommendations.userId],
      references: [users.id],
    }),
  }),
);

export type GameRecommendation = typeof gameRecommendations.$inferInsert;
