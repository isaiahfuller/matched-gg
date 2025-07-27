import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const websiteTypesTable = pgTable('website_types', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  type: text('type'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type WebsiteTypes = typeof websiteTypesTable.$inferInsert;
