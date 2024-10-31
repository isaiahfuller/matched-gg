import { relations } from 'drizzle-orm';
import {
  bigint,
  boolean,
  index,
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

export const websitesTable = pgTable(
  'websites',
  {
    checksum: text('checksum'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    game: bigint('game', { mode: 'number' }),
    igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
    trusted: boolean('trusted'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    url: text('url'),
    websiteCategory: WebsitePGEnum('category'),
  },
  (table) => {
    return { urlIdx: index('website_url_idx').on(table.url) };
  },
);

export const websiteRelations = relations(websitesTable, ({ one }) => ({
  game: one(gamesTable, {
    fields: [websitesTable.game],
    references: [gamesTable.igdbId],
  }),
}));

export type Websites = typeof websitesTable.$inferInsert;
