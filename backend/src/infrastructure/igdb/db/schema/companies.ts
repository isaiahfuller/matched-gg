import { relations } from 'drizzle-orm';
import {
  bigint,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { companyWebsitesTable } from './companyWebsites';
import { involvedCompaniesTable } from './involvedCompanies';

export const CompanyDateCategoryPGEnum = pgEnum('CompanyDateCategoryEnum', [
  'YYYYMMMMDD',
  'YYYYMMMM',
  'YYYY',
  'YYYYQ1',
  'YYYYQ2',
  'YYYYQ3',
  'YYYYQ4',
  'TBD',
]);

export const companiesTable = pgTable('companies', {
  changeDate: timestamp('change_date'),
  changeDateCategory: CompanyDateCategoryPGEnum('change_date_category'),
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
  startDateCategory: CompanyDateCategoryPGEnum('start_date_category'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
});

export const companyRelations = relations(companiesTable, ({ many, one }) => ({
  involvedCompanies: many(involvedCompaniesTable),
  parent: one(companiesTable, {
    fields: [companiesTable.parent],
    references: [companiesTable.igdbId],
  }),
  websites: many(companyWebsitesTable),
}));

export type Companies = typeof companiesTable.$inferInsert;
