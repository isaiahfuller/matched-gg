import type { Config } from 'drizzle-kit';
import { config } from '@config/config';

export default {
  schema: './src/**/db/schema/*.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port,
  },
} satisfies Config;
