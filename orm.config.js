// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

// Define sequelize configuration for the seeder or migration purpose
module.exports = {
  development: {
    dialect: process.env.DATABASE_DIALECT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  },
  test: {
    dialect: process.env.DATABASE_DIALECT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  },
  production: {
    dialect: process.env.DATABASE_DIALECT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
  },
};
