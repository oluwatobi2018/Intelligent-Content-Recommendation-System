module.exports = {
    development: {
      client: "pg",
      connection: {
        host: "127.0.0.1",
        user: "your_user",
        password: "your_password",
        database: "your_database",
      },
      migrations: {
        directory: "./database/migrations",
      },
      seeds: {
        directory: "./database/seeds",
      },
    },
  };
  