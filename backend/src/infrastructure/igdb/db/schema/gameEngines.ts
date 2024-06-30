import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { companiesTable } from './companies';

export const gameEnginesTable = pgTable('gameEngines', {
  checksum: text('checksum'),
  companies: bigint('companies', { mode: 'number' })
    .array()
    .references(() => companiesTable.igdbId),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  description: text('description'),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  logo: bigint('logo', { mode: 'number' }), // reference gameenginelogo
  name: text('name').notNull(),
  platforms: bigint('platforms', { mode: 'number' }), // references platform
  slug: text('slug'),
  url: text('url'),
});
