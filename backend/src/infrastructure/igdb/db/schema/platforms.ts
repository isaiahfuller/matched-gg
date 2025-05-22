import { relations } from 'drizzle-orm';
import { bigint, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { gamesTable } from './games';
import { platformFamiliesTable } from './platformFamilies';
import { platformLogosTable } from './platformLogos';
import { platformTypesTable } from './platformTypes';
import { platformVersionsTable } from './platformVersions';
import { platformWebsitesTable } from './platformWebsites';

export const platformsTable = pgTable('platforms', {
  abbreviation: text('abbreviation'),
  alternativeName: text('alternative_name'),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  generation: integer('generation'),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  name: text('name').notNull(),
  platformFamily: bigint('platform_family', { mode: 'number' }),
  platformLogo: bigint('platform_logo', { mode: 'number' }),
  platformType: bigint('platform_type', { mode: 'number' }),
  slug: text('slug'),
  summary: text('summary'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
  versions: bigint('versions', { mode: 'number' }).array(),
  websites: bigint('websites', { mode: 'number' }).array(),
});

export const platformRelations = relations(platformsTable, ({ many, one }) => ({
  games: many(gamesTable),
  platformFamily: one(platformFamiliesTable, {
    fields: [platformsTable.platformFamily],
    references: [platformFamiliesTable.igdbId],
  }),
  platformLogo: one(platformLogosTable, {
    fields: [platformsTable.platformLogo],
    references: [platformLogosTable.igdbId],
  }),
  platformType: one(platformTypesTable, {
    fields: [platformsTable.platformType],
    references: [platformTypesTable.igdbId],
  }),
  platformVersions: many(platformVersionsTable),
  platformWebsites: many(platformWebsitesTable),
}));

export type Platforms = typeof platformsTable.$inferInsert;
