import {
  bigint,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { gamesTable } from './games';

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
  changedCompanyId: bigint('changed_company_id', { mode: 'number' }).references(
    () => companiesTable.igdbId,
  ),
  checksum: text('checksum'),
  country: integer('country'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  description: text('description'),
  developed: bigint('developed', { mode: 'number' })
    .references(() => gamesTable.igdbId)
    .array(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  name: text('name'),
  parent: bigint('parent', { mode: 'number' }).references(
    () => companiesTable.igdbId,
  ),
  published: bigint('published', { mode: 'number' })
    .references(() => gamesTable.igdbId)
    .array(),
  slug: text('slug'),
  start_date: timestamp('start_date'),
  startDateCategory: CompanyDateCategoryPGEnum('start_date_category'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
});

export type Companies = typeof companiesTable.$inferInsert;
