import { migrate } from 'drizzle-orm/node-postgres/migrator';

import { client, db } from './db';

migrate(db, {
  migrationsFolder: 'src/db/migrations',
})
  .then(() => {
    console.log('Migrations complete');
    client.end();
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    client.end();
    process.exit(1);
  });
