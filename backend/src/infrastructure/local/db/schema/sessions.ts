import { index, json, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

// Column names and types follow connect-pg-simple's session store contract.
export const sessions = pgTable(
  'sessions',
  {
    expire: timestamp('expire', { precision: 6 }).notNull(),
    sess: json('sess').notNull(),
    sid: varchar('sid').primaryKey(),
  },
  (table) => ({ expireIndex: index('sessions_expire_idx').on(table.expire) }),
);
