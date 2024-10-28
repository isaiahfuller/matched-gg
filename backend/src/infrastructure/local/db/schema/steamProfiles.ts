import { relations } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';

import { users } from './users';

export const steamProfiles = pgTable('steam_profiles', {
  steamId: text('steam_id').primaryKey().notNull(),
  userId: integer('user_id').references(() => users.id),
});

export const steamProfilesRelations = relations(steamProfiles, ({ one }) => ({
  user: one(users, {
    fields: [steamProfiles.userId],
    references: [users.id],
  }),
}));
