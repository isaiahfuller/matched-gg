import { relations } from 'drizzle-orm';
import { bigint, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { steamProfiles } from './steamProfiles';

export const users = pgTable('users', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  email: text('email').notNull().unique(),
  id: integer('user_id')
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  name: text('name').notNull(),
  password: text('password').notNull(),
  refreshToken: text('refresh_token'),
  steamId: bigint('steam_id', { mode: 'number' }),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  steamProfile: one(steamProfiles, {
    fields: [users.steamId],
    references: [steamProfiles.steamId],
  }),
}));

export type Users = typeof users.$inferInsert;
