import { relations } from 'drizzle-orm';
import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { platformsTable } from './platforms';

export const platformFamiliesTable = pgTable('platformFamilies', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
  slug: text('slug'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const platformFamilyRelations = relations(
  platformFamiliesTable,
  ({ many }) => ({
    platforms: many(platformsTable),
  }),
);

export type PlatformFamilies = typeof platformFamiliesTable.$inferInsert;
