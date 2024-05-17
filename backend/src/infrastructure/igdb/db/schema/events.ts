import { pgTable, text, timestamp, bigint } from 'drizzle-orm/pg-core';
import { gamesTable } from './games';

export const eventsTable = pgTable('events', {
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  description: text('description'),
  endTime: timestamp('end_time'),
  games: bigint('games', { mode: 'number' })
    .references(() => gamesTable.igdbId)
    .array(),
  igdbCreatedAt: timestamp('igdb_created_at'),
  igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
  igdbUpdatedAt: timestamp('igdb_updated_at'),
  liveStreamUrl: text('live_stream_url'),
  name: text('name').notNull(),
  slug: text('slug'),
  startTime: timestamp('start_time'),
  timeZone: text('time_zone'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  videos: bigint('videos', { mode: 'number' }).array(), //TODO: Add reference once gameVideosTable is added
});

export type Events = typeof eventsTable.$inferInsert;
