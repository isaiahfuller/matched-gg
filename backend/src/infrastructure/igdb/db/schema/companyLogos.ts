import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const companyLogosTable = pgTable('artworks', {
  alphaChannel: boolean('alpha_channel'),
  animated: boolean('animated'),
  checksum: text('checksum'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  height: integer('height'),
  igdbId: integer('igdb_id'),
  imageId: text('image_id').primaryKey(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  url: text('url'),
  width: integer('width'),
});

export type CompanyLogos = typeof companyLogosTable.$inferInsert;
