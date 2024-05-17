import { pgTable } from 'drizzle-orm/pg-core';

import { commonArtFields } from './artworks';

export const gameEngineLogosTable = pgTable('gameEngineLogos', {
  ...commonArtFields,
});

export type GameEngineLogos = typeof gameEngineLogosTable.$inferInsert;
