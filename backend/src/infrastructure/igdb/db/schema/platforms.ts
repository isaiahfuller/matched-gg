import {
  bigint,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const PlatformCategoryPGEnum = pgEnum('PlatformCategoryEnum', [
  'console',
  'arcade',
  'platform',
  'operating_system',
  'portable_console',
  'computer',
]);

export const platformsTable = pgTable('platforms', {
  abbreviation: text('abbreviation'),
  alternativeName: text('alternative_name'),
  category: PlatformCategoryPGEnum('category'),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  generation: integer('generation'),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  name: text('name').notNull(),
  platformFamily: bigint('platform_family', { mode: 'number' }), // reference
  platformLogo: bigint('platform_logo', { mode: 'number' }), // reference
  slug: text('slug'),
  summary: text('summary'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
  versions: bigint('versions', { mode: 'number' }), // reference platform version
  websites: bigint('websites', { mode: 'number' }), // reference platform website
});

export type Platforms = typeof platformsTable.$inferInsert;
