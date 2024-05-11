import { bigint, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { gamesTable } from './games';
import { collectionsTable } from './collections';

export const CollectionMembershipTypePGEnum = pgEnum('CollectionTypeEnum', [
  '',
  'MEMBER',
  'SPINOFF',
]);

export const collectionMembershipTable = pgTable('collectionMemberships', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
  collection: bigint('game', { mode: 'number' }).references(
    () => collectionsTable.igdbId,
  ),
  checksum: text('checksum'),
  type: CollectionMembershipTypePGEnum('type'),
});

export type CollectionMembership =
  typeof collectionMembershipTable.$inferInsert;
