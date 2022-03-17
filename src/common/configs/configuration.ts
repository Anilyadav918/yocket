export default () => ({
  port: parseInt(<string>process.env.SERVER_PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    queryDebug: parseInt(<string>process.env.DATABASE_QUERY_DEBUG, 10) || 5432,
    dialect: parseInt(<string>process.env.DATABASE_DIALECT, 10) || 5432,
    port: parseInt(<string>process.env.DATABASE_PORT, 10) || 5432,
    name: parseInt(<string>process.env.DATABASE_NAME, 10) || 5432,
    user: parseInt(<string>process.env.DATABASE_USER, 10) || 5432,
    password: parseInt(<string>process.env.DATABASE_PASS, 10) || 5432,
  },
  mailer: {},
  storage: {},
});
