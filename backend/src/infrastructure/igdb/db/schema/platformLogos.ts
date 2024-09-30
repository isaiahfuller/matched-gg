import { pgTable } from 'drizzle-orm/pg-core';

import { commonArtFields } from './artworks';

export const platformLogosTable = pgTable('platformLogos', {
  ...commonArtFields,
});

export type PlatformLogos = typeof platformLogosTable.$inferInsert;
