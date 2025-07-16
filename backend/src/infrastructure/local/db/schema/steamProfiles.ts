import { relations } from 'drizzle-orm';
import { date, integer, pgTable, text } from 'drizzle-orm/pg-core';

import { users } from './users';

export const steamProfiles = pgTable('steam_profiles', {
  avatarhash: text('avatar'),
  createdAt: date('created_at').defaultNow(),
  personaname: text('name'),
  profileurl: text('url'),
  steamid: text('steam_id').primaryKey().notNull(),
  updatedAt: date('updated_at').defaultNow(),
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
});

export const steamProfilesRelations = relations(steamProfiles, ({ one }) => ({
  user: one(users, {
    fields: [steamProfiles.userId],
    references: [users.id],
  }),
}));
