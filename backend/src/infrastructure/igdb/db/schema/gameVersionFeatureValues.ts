import { bigint, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { gameVersionFeaturesTable } from './gameVersionFeatures';
import { gamesTable } from './games';

export const GameVersionFeatureValueIncludedFeaturePGEnum = pgEnum(
  'GameVersionFeatureValueIncludedFeatureEnum',
  ['NOT_INCLUDED', 'INCLUDED', 'PRE_ORDER_ONLY'],
);

export const gameVersionFeatureValuesTable = pgTable(
  'gameVersionFeatureValues',
  {
    checksum: text('checksum'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    game: bigint('game', { mode: 'number' })
      .notNull()
      .references(() => gamesTable.igdbId),
    gameFeature: bigint('game_feature', { mode: 'number' }).references(
      () => gameVersionFeaturesTable.igdbId,
    ),
    igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
    includedFeature:
      GameVersionFeatureValueIncludedFeaturePGEnum('included_feature'),
    note: text('note'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
);

export type GameVersionFeatureValues =
  typeof gameVersionFeatureValuesTable.$inferInsert;
