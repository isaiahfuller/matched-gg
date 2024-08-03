import {
  bigint,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const GameVersionFeatureCategoryPGEnum = pgEnum(
  'GameVersionFeatureEnum',
  ['boolean', 'description'],
);

export const gameVersionFeaturesTable = pgTable('gameVersionFeatures', {
  category: GameVersionFeatureCategoryPGEnum('category').notNull(),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  description: text('description').notNull(),
  igdbId: serial('igdb_id').notNull().unique(),
  position: integer('position'),
  title: text('title').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  values: bigint('values', { mode: 'number' }).array(),
});

export type GameVersionFeatures = typeof gameVersionFeaturesTable.$inferInsert;
