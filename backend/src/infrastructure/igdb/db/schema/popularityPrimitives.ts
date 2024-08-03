import {
  bigint,
  decimal,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { gamesTable } from './games';
import { popularityTypesTable } from './popularityTypes';

export const PopularitySourcePGEnum = pgEnum('PopularitySourceEnum', ['igdb']);

export const popularityPrimitivesTable = pgTable('popularityPrimitives', {
  calculatedAt: timestamp('calculated_at'),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  gameId: bigint('game_id', { mode: 'number' }).references(
    () => gamesTable.igdbId,
  ),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  popularitySource: PopularitySourcePGEnum('popularity_source'),
  popularityType: bigint('popularity_type', { mode: 'number' }).references(
    () => popularityTypesTable.igdbId,
  ),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  value: decimal('value'),
});
export type PopularityPrimitives =
  typeof popularityPrimitivesTable.$inferInsert;
