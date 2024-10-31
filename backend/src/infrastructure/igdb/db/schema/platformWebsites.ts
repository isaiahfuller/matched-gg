import { relations } from 'drizzle-orm';
import {
  bigint,
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { platformsTable } from './platforms';

export const PlatformWebsiteCategoryPGEnum = pgEnum(
  'PlatformWebsiteCategoryEnum',
  [
    'official',
    'wikia',
    'wikipedia',
    'facebook',
    'twitter',
    'twitch',
    'instagram',
    'youtube',
    'iphone',
    'ipad',
    'android',
    'steam',
    'reddit',
    'discord',
    'google_plus',
    'tumblr',
    'linkedin',
    'pinterest',
    'soundcloud',
  ],
);

export const platformWebsitesTable = pgTable('platformWebsites', {
  category: PlatformWebsiteCategoryPGEnum('category'),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  trusted: boolean('trusted'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
});

export const platformWebsiteReleations = relations(
  platformWebsitesTable,
  ({ many }) => ({
    platforms: many(platformsTable),
  }),
);

export type PlatformWebsites = typeof platformWebsitesTable.$inferInsert;
