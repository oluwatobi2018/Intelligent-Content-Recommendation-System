module.exports = {
    development: {
      client: "pg",
      connection: {
        host: "127.0.0.1",
        user: "your_user",
        password: "your_password",
        database: "recommendation_db",
      },
      migrations: {
        directory: "./database/migrations",
      },
      seeds: {
        directory: "./database/seeds",
      },
    },
  };
  
