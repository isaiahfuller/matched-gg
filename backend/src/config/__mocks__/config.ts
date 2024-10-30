const mockConfig = {
  db: {
    database: 'postgres',
    host: 'localhost',
    password: 'g4mr',
    port: 5432,
    user: 'g4mr',
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
