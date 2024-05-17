// import {
//   integer,
//   pgEnum,
//   pgTable,
//   serial,
//   text,
//   timestamp,
//   bigint,
//   uniqueIndex,
//   index,
//   doublePrecision,
// } from 'drizzle-orm/pg-core';

// export const webhookTable = pgTable(
//   'webhook',
//   {
//     id: serial('webhook_id').primaryKey(),
//     url: text('url').notNull(),
//     createdAt: timestamp('created_at').notNull().defaultNow(),
//     updatedAt: timestamp('updated_at').notNull().defaultNow(),
//     secret: text('secret').notNull(),
//   },
//   (table) => {
//     return {};
//   },
// );
