import {
  bigint,
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { gamesTable } from './games';

export const WebsitePGEnum = pgEnum('WebsiteCategoryEnum', [
  'blank1',
  'official',
  'wikia',
  'wikipedia',
  'facebook',
  'twitter',
  'twitch',
  'blank2',
  'instagram',
  'youtube',
  'iphone',
  'ipad',
  'android',
  'steam',
  'reddit',
  'itch',
  'epicgames',
  'gog',
  'discord',
]);

export const websitesTable = pgTable('websites', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  game: bigint('game', { mode: 'number' }).references(() => gamesTable.igdbId),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  trusted: boolean('trusted'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
  websiteCategory: WebsitePGEnum('category'),
});

export type Websites = typeof websitesTable.$inferInsert;
