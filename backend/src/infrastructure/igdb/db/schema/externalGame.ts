import {
  bigint,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

import { gamesTable } from './games';
import { platformsTable } from './platforms';

export const ExternalGameMediaPGEnum = pgEnum('ExternalGameMediaEnum', [
  '',
  'DIGITAL',
  'PHYSICAL',
]);

export const externalGamesTable = pgTable(
  'externalGames',
  {
    category: integer('category'), //ExternalGameCategoryPGEnum
    checksum: text('checksum'),
    countries: integer('countries').array(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    game: bigint('game', { mode: 'number' }).references(
      () => gamesTable.igdbId,
    ),
    igdbCreatedAt: timestamp('igdb_created_at'),
    igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
    igdbUpdatedAt: timestamp('igdb_updated_at'),
    media: ExternalGameMediaPGEnum('media'),
    name: text('name'),
    platform: bigint('platform', { mode: 'number' }).references(
      () => platformsTable.igdbId,
    ),
    uid: text('uid'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    url: text('url'),
    year: integer('year'),
  },
  (table) => {
    return {
      igdbUidIdx: index('igdb_uid_idx').on(table.uid),
      uniqueUrlIdx: uniqueIndex('url_idx').on(table.url),
    };
  },
);

export type ExternalGames = typeof externalGamesTable.$inferInsert;
