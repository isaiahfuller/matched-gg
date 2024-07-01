import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { companiesTable } from './companies';
import { gameEngineLogosTable } from './gameEngineLogos';
import { gamesTable } from './games';

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
  logo: bigint('logo', { mode: 'number' }).references(
    () => gameEngineLogosTable.igdbId,
  ),
  name: text('name').notNull(),
  platforms: bigint('platforms', { mode: 'number' }), // references platform
  slug: text('slug'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
});

export type GameEngines = typeof gamesTable.$inferInsert;
