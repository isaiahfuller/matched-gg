import { relations } from 'drizzle-orm';
import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { ageRatingCategoriesTable } from './ageRatingCategories';
import { ageRatingCDsTable } from './ageRatingContentDescriptionsv2';
import { ageRatingOrganizationsTable } from './ageRatingOrganizations';
import { gamesTable } from './games';

export const ageRatingsTable = pgTable('ageRatings', {
  checksum: text('checksum'),
  contentDescriptions: bigint('content_descriptions', {
    mode: 'number',
  }).array(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  organization: bigint('organization', { mode: 'number' }),
  ratingCategory: bigint('rating_category', { mode: 'number' }),
  ratingContentDescriptions: bigint('rating_content_descriptions', {
    mode: 'number',
  }).array(),
  ratingCoverUrl: text('url'),
  synopsis: text('synopsis'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const ageRatingRelations = relations(
  ageRatingsTable,
  ({ many, one }) => ({
    gameId: one(gamesTable),
    organization: one(ageRatingOrganizationsTable, {
      fields: [ageRatingsTable.organization],
      references: [ageRatingOrganizationsTable.igdbId],
    }),
    ratingCategory: one(ageRatingCategoriesTable, {
      fields: [ageRatingsTable.ratingCategory],
      references: [ageRatingCategoriesTable.igdbId],
    }),
    ratingContentDescriptions: many(ageRatingCDsTable),
  }),
);

export type AgeRating = typeof ageRatingsTable.$inferInsert;
