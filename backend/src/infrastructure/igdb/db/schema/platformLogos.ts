import { relations } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';

import { commonArtFields } from './artworks';
import { platformVersionsTable } from './platformVersions';
import { platformsTable } from './platforms';

export const platformLogosTable = pgTable('platformLogos', {
  ...commonArtFields,
});

export const platformLogosRelations = relations(
  platformLogosTable,
  ({ many }) => ({
    platformVersions: many(platformVersionsTable),
    platforms: many(platformsTable),
  }),
);

export type PlatformLogos = typeof platformLogosTable.$inferInsert;
