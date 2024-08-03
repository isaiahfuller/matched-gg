import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const platformVersionsTable = pgTable('platformVersions', {
  checksum: text('checksum'),
  companies: bigint('companies', { mode: 'number' }).array(),
  connectivity: text('connectivity'),
  cpu: text('cpu'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  graphics: text('graphics'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  mainManufacturer: bigint('main_manufacturer', { mode: 'number' }), // reference platform version company
  media: text('media'),
  memory: text('memory'),
  name: text('name').notNull(),
  os: text('os'),
  output: text('output'),
  platformLogo: bigint('platform_logo', { mode: 'number' }), // reference platform logo
  platformVersionReleaseDates: bigint('platform_version_release_dates', {
    mode: 'number',
  }).array(),
  resolutions: text('resolutions'),
  slug: text('slug'),
  sound: text('sound'),
  storage: text('storage'),
  summary: text('summary'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
});

export type PlatformVersions = typeof platformVersionsTable.$inferInsert;
