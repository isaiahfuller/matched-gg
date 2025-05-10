import { relations } from 'drizzle-orm';
import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { ageRatingOrganizationsTable } from './ageRatingOrganizations';

export const ageRatingCDsTable = pgTable('age_rating_content_descriptions_v2', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  description: text('description'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  organization: bigint('organization', { mode: 'number' }),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const cdRelations = relations(ageRatingCDsTable, ({ one }) => ({
  organization: one(ageRatingOrganizationsTable, {
    fields: [ageRatingCDsTable.organization],
    references: [ageRatingOrganizationsTable.igdbId],
  }),
}));

export type AgeRatingContentDescriptionsv2 =
  typeof ageRatingCDsTable.$inferInsert;
