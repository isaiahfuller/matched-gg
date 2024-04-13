import { db, client } from './db';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

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
