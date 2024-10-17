import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  email: text('email').notNull().unique(),
  id: integer('user_id')
    .primaryKey()
    .generatedAlwaysAsIdentity({ startWith: 1000 }),
  name: text('name').notNull(),
  password: text('password').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Users = typeof usersTable.$inferInsert;
