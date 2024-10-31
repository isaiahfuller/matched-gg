import { relations } from 'drizzle-orm';
import { bigint, boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { companiesTable } from './companies';
import { platformVersionsTable } from './platformVersions';

export const platformVersionCompaniesTable = pgTable(
  'platformVersionCompanies',
  {
    checksum: text('checksum'),
    comment: text('comment'),
    company: bigint('company', { mode: 'number' }).references(
      () => companiesTable.igdbId,
    ),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    developer: boolean('developer'),
    igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
    manufacturer: boolean('manufacturer'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
);

export const platformVersionCompanyRelations = relations(
  platformVersionCompaniesTable,
  ({ many }) => ({
    platforms: many(platformVersionsTable),
  }),
);

export type PlatformVersionCompanies =
  typeof platformVersionCompaniesTable.$inferInsert;
