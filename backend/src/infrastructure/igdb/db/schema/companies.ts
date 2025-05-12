import { relations } from 'drizzle-orm';
import { bigint, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { companyWebsitesTable } from './companyWebsites';
import { dateFormatTable } from './dateFormats';
import { involvedCompaniesTable } from './involvedCompanies';

export const companiesTable = pgTable('companies', {
  changeDate: timestamp('change_date'),
  changeDateFormat: bigint('change_date_format', { mode: 'number' }),
  changedCompanyId: bigint('changed_company_id', { mode: 'number' }),
  checksum: text('checksum'),
  country: integer('country'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  description: text('description'),
  developed: bigint('developed', { mode: 'number' }).array(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  logo: bigint('logo', { mode: 'number' }),
  name: text('name'),
  parent: bigint('parent', { mode: 'number' }),
  published: bigint('published', { mode: 'number' }).array(),
  slug: text('slug'),
  startDate: timestamp('start_date'),
  startDateFormat: bigint('start_date_format', { mode: 'number' }),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
});

export const companyRelations = relations(companiesTable, ({ many, one }) => ({
  changeDateFormat: one(dateFormatTable, {
    fields: [companiesTable.changeDateFormat],
    references: [dateFormatTable.igdbId],
  }),
  involvedCompanies: many(involvedCompaniesTable),
  parent: one(companiesTable, {
    fields: [companiesTable.parent],
    references: [companiesTable.igdbId],
  }),
  startDateFormat: one(dateFormatTable, {
    fields: [companiesTable.startDateFormat],
    references: [dateFormatTable.igdbId],
  }),
  websites: many(companyWebsitesTable),
}));

export type Companies = typeof companiesTable.$inferInsert;
