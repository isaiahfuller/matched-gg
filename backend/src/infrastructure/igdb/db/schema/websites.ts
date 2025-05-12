import { relations } from 'drizzle-orm';
import {
  bigint,
  boolean,
  index,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { gamesTable } from './games';
import { websiteTypesTable } from './websiteTypes';

export const websitesTable = pgTable(
  'websites',
  {
    checksum: text('checksum'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    game: bigint('game', { mode: 'number' }),
    igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
    trusted: boolean('trusted'),
    type: bigint('type', { mode: 'number' }),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    url: text('url'),
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
  type: one(websiteTypesTable, {
    fields: [websitesTable.type],
    references: [websiteTypesTable.igdbId],
  }),
}));

export type Websites = typeof websitesTable.$inferInsert;
