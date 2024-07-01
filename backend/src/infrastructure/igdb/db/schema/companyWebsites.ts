import { bigint, boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { WebsitePGEnum } from './websites';

export const companyWebsitesTable = pgTable('companyWebsites', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  trusted: boolean('trusted'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
  websiteCategory: WebsitePGEnum('category'),
});

export type CompanyWebsites = typeof companyWebsitesTable.$inferInsert;
