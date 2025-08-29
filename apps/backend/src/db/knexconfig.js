const path = require('node:path');

require('ts-node').register({
  transpileOnly: true,
  project: path.join(__dirname, '../..', 'tsconfig.json'),
});

const baseConfig = {
  development: {
    client: 'sqlite3',
    connection: { filename: path.join(__dirname, 'dev.db') },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, 'migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
      extension: 'ts',
    },
  },
  test: {
    client: 'sqlite3',
    connection: { filename: path.join(__dirname, 'test.db') },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, 'migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
      extension: 'ts',
    },
  },
  production: {
    client: 'sqlite3',
    connection: { filename: path.join(__dirname, 'prod.db') },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, 'migrations'),
      extension: 'js',
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
      extension: 'js',
    },
  },
};

module.exports = baseConfig;
