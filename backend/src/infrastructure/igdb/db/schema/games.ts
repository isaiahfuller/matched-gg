import {
  bigint,
  doublePrecision,
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { igdbSteamConnect } from 'src/infrastructure/steam/db/schema/igdbSteamConnect';

import { ageRatingsTable } from './ageRatings';
import { alternativeNamesTable } from './alternativeNames';
import { artworksTable } from './artworks';
import { collectionsTable } from './collections';
import { coversTable } from './covers';
import { externalGamesTable } from './externalGame';
import { franchisesTable } from './franchise';
import { gameEnginesTable } from './gameEngines';
import { gameLocalizationsTable } from './gameLocalizations';
import { gameModeTable } from './gameMode';
import { gameVideosTable } from './gameVideos';
import { genresTable } from './genres';
import { involvedCompaniesTable } from './involvedCompanies';
import { keywordsTable } from './keywords';
import { languageSupportsTable } from './languageSupport';
import { multiplayerModesTable } from './multiplayerModes';
import { platformsTable } from './platforms';
import { playerPerspectivesTable } from './playerPerspectives';
import { releaseDatesTable } from './releaseDates';
import { screenshotsTable } from './screenshots';
import { themesTable } from './themes';
import { websitesTable } from './websites';

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
    ageRatings: bigint('age_ratings', { mode: 'number' }).array(),
    aggregatedRating: doublePrecision('aggregated_rating'),
    aggregatedRatingCount: integer('aggregated_rating_count'),
    alternativeNames: bigint('alternative_names', { mode: 'number' }).array(),
    artworks: bigint('artworks', { mode: 'number' }).array(),
    bundles: bigint('bundles', { mode: 'number' }).array(),
    category: GameCategoryPGEnum('category'),
    checksum: text('checksum'),
    collections: bigint('collections', { mode: 'number' }).array(),
    cover: bigint('cover', { mode: 'number' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    dlcs: bigint('dlcs', { mode: 'number' }).array(),
    expandedGames: bigint('expanded_games', { mode: 'number' }).array(),
    expansions: bigint('expansions', { mode: 'number' }).array(),
    externalGames: bigint('external_games', { mode: 'number' }).array(),
    firstReleaseDate: timestamp('first_release_date'),
    forks: bigint('forks', { mode: 'number' }).array(),
    franchise: bigint('franchise', { mode: 'number' }),
    franchises: bigint('franchises', { mode: 'number' }).array(),
    gameCategory: GameCategoryPGEnum('game_category'),
    gameEngines: bigint('game_engines', { mode: 'number' }).array(),
    gameLocalizations: bigint('game_localizations', { mode: 'number' }).array(),
    gameModes: bigint('game_modes', { mode: 'number' }).array(),
    genres: bigint('genres', { mode: 'number' }).array(),
    hypes: integer('hypes'),
    id: serial('game_id').notNull().unique(),
    igdbCreatedAt: timestamp('igdb_created_at'),
    igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
    igdbUpdatedAt: timestamp('igdb_updated_at'),
    involvedCompanies: bigint('involved_companies', { mode: 'number' }).array(),
    keywords: bigint('keywords', { mode: 'number' }).array(),
    languageSupports: bigint('language_supports', { mode: 'number' }).array(),
    multiplayerModes: bigint('multiplayer_modes', { mode: 'number' }).array(),
    name: text('name').notNull(),
    parentGame: bigint('parent_game', { mode: 'number' }),
    platforms: bigint('platforms', { mode: 'number' }).array(),
    playerPerspectives: bigint('player_perspectives', {
      mode: 'number',
    }).array(),
    ports: bigint('ports', { mode: 'number' }).array(),
    rating: doublePrecision('rating'),
    ratingCount: integer('rating_count'),
    releaseDates: bigint('release_dates', { mode: 'number' }).array(),
    remakes: bigint('remakes', { mode: 'number' }).array(),
    remasters: bigint('remasters', { mode: 'number' }).array(),
    screenshots: bigint('screenshots', { mode: 'number' }).array(),
    similarGames: bigint('similar_games', { mode: 'number' }).array(),
    slug: text('slug'),
    standaloneExpansions: bigint('standalone_expansions', {
      mode: 'number',
    }).array(),
    status: StatusPGEnum('status'),
    storyline: text('storyline'),
    summary: text('summary'),
    tags: bigint('tags', { mode: 'number' }).array(),
    themes: bigint('themes', { mode: 'number' }).array(),
    totalRating: doublePrecision('total_rating'),
    totalRatingCount: integer('total_rating_count'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    url: text('url'),
    versionParent: bigint('version_parent', { mode: 'number' }),
    versionTitle: text('version_title'),
    videos: bigint('videos', { mode: 'number' }).array(),
    websites: bigint('websites', { mode: 'number' }).array(),
  },
  (table) => {
    return {
      nameIdx: index('name_idx').on(table.name),
      slugIdx: index('slug_idx').on(table.slug),
      uniqueIgdbIdIdx: uniqueIndex('igdb_id_idx').on(table.igdbId),
    };
  },
);

export const gamesRelations = relations(gamesTable, ({ many, one }) => ({
  ageRatings: many(ageRatingsTable),
  alternativeNames: many(alternativeNamesTable),
  artworks: many(artworksTable),
  bundles: many(gamesTable),
  collections: many(collectionsTable),
  cover: one(coversTable, {
    fields: [gamesTable.cover],
    references: [coversTable.igdbId],
  }),
  dlcs: many(gamesTable),
  expanded_games: many(gamesTable),
  expansions: many(gamesTable),
  externalGames: many(externalGamesTable),
  forks: many(gamesTable),
  franchise: one(franchisesTable, {
    fields: [gamesTable.franchise],
    references: [franchisesTable.igdbId],
  }),
  franchises: many(gameFranchises),
  gameEngines: many(gameEnginesTable),
  gameLocalizations: many(gameLocalizationsTable),
  gameModes: many(gameGameModes),
  genres: many(gameGenres),
  involvedCompanies: many(involvedCompaniesTable),
  keywords: many(gameKeywords),
  languageSupports: many(languageSupportsTable),
  multiplayerModes: many(gameMultiplayerModes),
  parentGame: one(gamesTable, {
    fields: [gamesTable.parentGame],
    references: [gamesTable.igdbId],
  }),
  platforms: many(gamePlatforms),
  playerPerspectives: many(playerPerspectivesTable),
  ports: many(gamesTable),
  releaseDates: many(releaseDatesTable),
  remakes: many(gamesTable),
  remasters: many(gamesTable),
  screenshots: many(screenshotsTable),
  similarGames: many(gameSimilarGames),
  standaloneExpansions: many(gamesTable),
  steamId: one(igdbSteamConnect, {
    fields: [gamesTable.igdbId],
    references: [igdbSteamConnect.igdbId],
  }),
  themes: many(gameThemes),
  versionParent: one(gamesTable, {
    fields: [gamesTable.versionParent],
    references: [gamesTable.igdbId],
  }),
  videos: many(gameVideosTable),
  websites: many(websitesTable),
}));

export const gameKeywords = pgTable(
  'game_keywords',
  {
    gameId: bigint('game_id', { mode: 'number' }).notNull(),
    resourceId: bigint('keyword_id', { mode: 'number' }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.resourceId, t.gameId),
  }),
);

export const gameKeywordsRelations = relations(gameKeywords, ({ one }) => ({
  game: one(gamesTable, {
    fields: [gameKeywords.gameId],
    references: [gamesTable.igdbId],
  }),
  keyword: one(keywordsTable, {
    fields: [gameKeywords.resourceId],
    references: [keywordsTable.igdbId],
  }),
}));

export const gameFranchises = pgTable(
  'game_franchises',
  {
    gameId: bigint('game_id', { mode: 'number' }).notNull(),
    resourceId: bigint('franchise_id', { mode: 'number' }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.resourceId, t.gameId),
  }),
);

export const gameFranchisesRelations = relations(gameFranchises, ({ one }) => ({
  franchise: one(franchisesTable, {
    fields: [gameFranchises.resourceId],
    references: [franchisesTable.igdbId],
  }),
  game: one(gamesTable, {
    fields: [gameFranchises.gameId],
    references: [gamesTable.igdbId],
  }),
}));

export const gamePlatforms = pgTable(
  'game_platforms',
  {
    gameId: bigint('game_id', { mode: 'number' }).notNull(),
    resourceId: bigint('platform_id', { mode: 'number' }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.resourceId, t.gameId),
  }),
);

export const gamePlatformsRelations = relations(gamePlatforms, ({ one }) => ({
  game: one(gamesTable, {
    fields: [gamePlatforms.gameId],
    references: [gamesTable.igdbId],
  }),
  platform: one(platformsTable, {
    fields: [gamePlatforms.resourceId],
    references: [platformsTable.igdbId],
  }),
}));

export const gameGenres = pgTable(
  'game_genres',
  {
    gameId: bigint('game_id', { mode: 'number' }).notNull(),
    resourceId: bigint('genre_id', { mode: 'number' }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.resourceId, t.gameId),
  }),
);

export const gameGenresRelations = relations(gameGenres, ({ one }) => ({
  game: one(gamesTable, {
    fields: [gameGenres.gameId],
    references: [gamesTable.igdbId],
  }),
  genre: one(genresTable, {
    fields: [gameGenres.resourceId],
    references: [genresTable.igdbId],
  }),
}));

export const gameThemes = pgTable(
  'game_themes',
  {
    gameId: bigint('game_id', { mode: 'number' }).notNull(),
    resourceId: bigint('theme_id', { mode: 'number' }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.resourceId, t.gameId),
  }),
);

export const gameThemesRelations = relations(gameThemes, ({ one }) => ({
  game: one(gamesTable, {
    fields: [gameThemes.gameId],
    references: [gamesTable.igdbId],
  }),
  theme: one(themesTable, {
    fields: [gameThemes.resourceId],
    references: [themesTable.igdbId],
  }),
}));

export const gameMultiplayerModes = pgTable(
  'game_multiplayer_modes',
  {
    gameId: bigint('game_id', { mode: 'number' }).notNull(),
    resourceId: bigint('multiplayer_mode_id', { mode: 'number' }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.resourceId, t.gameId),
  }),
);

export const gameMultiplayerModesRelations = relations(
  gameMultiplayerModes,
  ({ one }) => ({
    game: one(gamesTable, {
      fields: [gameMultiplayerModes.gameId],
      references: [gamesTable.igdbId],
    }),
    multiplayerMode: one(multiplayerModesTable, {
      fields: [gameMultiplayerModes.resourceId],
      references: [multiplayerModesTable.igdbId],
    }),
  }),
);

export const gameGameModes = pgTable(
  'game_game_modes',
  {
    gameId: bigint('game_id', { mode: 'number' }).notNull(),
    resourceId: bigint('game_mode_id', { mode: 'number' }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.resourceId, t.gameId),
  }),
);

export const gameGameModesRelations = relations(gameGameModes, ({ one }) => ({
  game: one(gamesTable, {
    fields: [gameGameModes.gameId],
    references: [gamesTable.igdbId],
  }),
  gameMode: one(gameModeTable, {
    fields: [gameGameModes.resourceId],
    references: [gameModeTable.igdbId],
  }),
}));

export const gameSimilarGames = pgTable(
  'game_similar_games',
  {
    gameId: bigint('game_id', { mode: 'number' }).notNull(),
    resourceId: bigint('similar_game_id', { mode: 'number' }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.resourceId, t.gameId),
  }),
);

export const gameSimilarGamesRelations = relations(
  gameSimilarGames,
  ({ one }) => ({
    game: one(gamesTable, {
      fields: [gameSimilarGames.gameId],
      references: [gamesTable.igdbId],
    }),
    similarGame: one(gamesTable, {
      fields: [gameSimilarGames.resourceId],
      references: [gamesTable.igdbId],
    }),
  }),
);

export type Games = typeof gamesTable.$inferInsert;
export type GameKeywords = typeof gameKeywords.$inferInsert;
export type GameFranchises = typeof gameFranchises.$inferInsert;
export type GamePlatforms = typeof gamePlatforms.$inferInsert;
export type GameGenres = typeof gameGenres.$inferInsert;
export type GameThemes = typeof gameThemes.$inferInsert;
export type GameMultiplayerModes = typeof gameMultiplayerModes.$inferInsert;
export type GameGameModes = typeof gameGameModes.$inferInsert;
export type SimilarGames = typeof gameSimilarGames.$inferInsert;
