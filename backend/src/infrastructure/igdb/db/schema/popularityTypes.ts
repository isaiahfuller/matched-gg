import { bigint, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const PopularitySourcePGEnum = pgEnum('PopularitySourceEnum', ['igdb']);

export const popularityTypesTable = pgTable('popularityTypes', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  name: text('name').notNull(),
  popularitySource: PopularitySourcePGEnum('popularity_source'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type PopularityTypes = typeof popularityTypesTable.$inferInsert;
