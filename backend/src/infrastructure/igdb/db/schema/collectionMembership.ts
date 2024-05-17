import { bigint, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { collectionsTable } from './collections';
import { gamesTable } from './games';

export const CollectionMembershipTypePGEnum = pgEnum('CollectionTypeEnum', [
  '',
  'MEMBER',
  'SPINOFF',
]);

export const collectionMembershipTable = pgTable('collectionMemberships', {
  checksum: text('checksum'),
  collection: bigint('game', { mode: 'number' }).references(
    () => collectionsTable.igdbId,
  ),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  type: CollectionMembershipTypePGEnum('type'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type CollectionMembership =
  typeof collectionMembershipTable.$inferInsert;
