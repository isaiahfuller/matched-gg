import { relations } from 'drizzle-orm';
import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { ageRatingOrganizationsTable } from './ageRatingOrganizations';

export const ageRatingCategoriesTable = pgTable('age_rating_categories', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  organization: bigint('organization', { mode: 'number' }),
  rating: text('rating'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const categoryRelations = relations(
  ageRatingCategoriesTable,
  ({ one }) => ({
    organization: one(ageRatingOrganizationsTable, {
      fields: [ageRatingCategoriesTable.organization],
      references: [ageRatingOrganizationsTable.igdbId],
    }),
  }),
);

export type AgeRatingCategories = typeof ageRatingCategoriesTable.$inferInsert;
