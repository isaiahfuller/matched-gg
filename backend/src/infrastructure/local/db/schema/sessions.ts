import { index, json, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

// Column names and types follow connect-pg-simple's session store contract.
export const sessions = pgTable(
  'sessions',
  {
    sid: varchar('sid').primaryKey(),
    sess: json('sess').notNull(),
    expire: timestamp('expire', { precision: 6 }).notNull(),
  },
  (table) => ({ expireIndex: index('sessions_expire_idx').on(table.expire) }),
);
