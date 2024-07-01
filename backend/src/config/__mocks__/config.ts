const mockConfig = {
  db: {
    database: 'postgres',
    host: 'localhost:5432',
    password: 'postgres',
    port: 5432,
    user: 'postgres',
  },
  pinoOptions: {
    enabled: true,
    level: 'info',
    name: 'logger',
  },
  port: 3000,
  steam: {
    apiKey: 'bny8iby8987byobnjhi',
  },
  twitch: {
    apiUrl: 'http://localhost:5000/',
    clientId: 'efawefawef',
    clientSecret: 'awefwaefweaf',
  },
};

export { mockConfig as config };
