const mockConfig = {
  port: 3000,
  db: {
    host: 'localhost:5432',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'postgres',
  },
  twitch: {
    apiUrl: 'http://localhost:5000/',
    clientId: 'efawefawef',
    clientSecret: 'awefwaefweaf',
  },
  pinoOptions: {
    level: 'info',
    name: 'logger',
    enabled: true,
  },
};

export { mockConfig as config };
