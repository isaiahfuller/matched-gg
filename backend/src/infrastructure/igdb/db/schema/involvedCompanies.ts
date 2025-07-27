import { relations } from 'drizzle-orm';
import { bigint, boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { companiesTable } from './companies';
import { gamesTable } from './games';

export const involvedCompaniesTable = pgTable('involvedCompanies', {
  checksum: text('checksum'),
  company: bigint('company', { mode: 'number' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  developer: boolean('developer'),
  game: bigint('game', { mode: 'number' }),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  porting: boolean('porting'),
  publisher: boolean('publisher'),
  supporting: boolean('supporting'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const involvedCompanyRelations = relations(
  involvedCompaniesTable,
  ({ one }) => ({
    company: one(companiesTable, {
      fields: [involvedCompaniesTable.company],
      references: [companiesTable.igdbId],
    }),
    game: one(gamesTable, {
      fields: [involvedCompaniesTable.game],
      references: [gamesTable.igdbId],
    }),
  }),
);

export type InvolvedCompanies = typeof involvedCompaniesTable.$inferInsert;
