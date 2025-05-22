import { relations } from 'drizzle-orm';
import { bigint, boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { companiesTable } from './companies';
import { websiteTypesTable } from './websiteTypes';

export const companyWebsitesTable = pgTable('companyWebsites', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  trusted: boolean('trusted'),
  type: bigint('type', { mode: 'number' }),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
});

export const companyWebsiteRelations = relations(
  companyWebsitesTable,
  ({ one }) => ({
    company: one(companiesTable),
    type: one(websiteTypesTable, {
      fields: [companyWebsitesTable.type],
      references: [websiteTypesTable.igdbId],
    }),
  }),
);

export type CompanyWebsites = typeof companyWebsitesTable.$inferInsert;
