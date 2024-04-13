import { bigint, boolean, pgEnum, pgTable, text } from 'drizzle-orm/pg-core';

export const WebsitePGEnum = pgEnum('WebsiteCategoryEnum', [
  'official',
  'wikia',
  'wikipedia',
  'facebook',
  'twitter',
  'twitch',
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
  websiteCategory: WebsitePGEnum('category'),
  checksum: text('checksum'),
  igdbId: bigint('igdb_id', { mode: 'number' }).notNull().unique(),
  trusted: boolean('trusted'),
  url: text('url'),
});

export type Websites = typeof websitesTable.$inferInsert;
