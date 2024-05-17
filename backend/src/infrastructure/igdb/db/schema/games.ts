import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  bigint,
  uniqueIndex,
  index,
  doublePrecision,
} from 'drizzle-orm/pg-core';

// declaring enum in database
export const GameCategoryPGEnum = pgEnum('GameCategoryEnum', [
  'MAIN_GAME',
  'DLC_ADDON',
  'EXPANSION',
  'BUNDLE',
  'STANDALONE_EXPANSION',
  'MOD',
  'EPISODE',
  'SEASON',
  'REMAKE',
  'REMASTER',
  'EXPANDED_GAME',
  'PORT',
  'FORK',
  'PACK',
  'UPDATE',
]);

export const StatusPGEnum = pgEnum('StatusEnum', [
  'RELEASED',
  'ALPHA',
  'BETA',
  'EARLY_ACCESS',
  'OFFLINE',
  'CANCELLED',
  'RUMORED',
  'DELISTED',
]);

export const gamesTable = pgTable(
  'games',
  {
    aggregatedRating: doublePrecision('aggregated_rating'),
    aggregatedRatingCount: integer('aggregated_rating_count'),
    checksum: text('checksum'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    firstReleaseDate: timestamp('first_release_date'),
    gameCategory: GameCategoryPGEnum('game_category'),
    hypes: integer('hypes'),
    id: serial('game_id').notNull().unique(),
    igdbCreatedAt: timestamp('igdb_created_at'),
    igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
    igdbUpdatedAt: timestamp('igdb_updated_at'),
    name: text('name').notNull(),
    rating: doublePrecision('rating'),
    ratingCount: integer('rating_count'),
    slug: text('slug'),
    status: StatusPGEnum('status'),
    storyline: text('storyline'),
    summary: text('summary'),
    totalRating: doublePrecision('total_rating'),
    totalRatingCount: integer('total_rating_count'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    url: text('url'),
    versionTitle: text('version_title'),
  },
  (table) => {
    return {
      nameIdx: index('name_idx').on(table.name),
      slugIdx: index('slug_idx').on(table.slug),
      uniqueIgdbIdIdx: uniqueIndex('igdb_id_idx').on(table.igdbId),
    };
  },
);

export type Games = typeof gamesTable.$inferInsert;
