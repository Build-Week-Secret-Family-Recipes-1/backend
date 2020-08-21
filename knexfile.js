require("dotenv").config();

const pgConnection = process.env.DATABASE_URL || "postgres://oyemyqtbmvqzbt:486a932b8d91b828d30a96a4c2a984ca659377fe144367afa4ff6036939e48b0@ec2-54-236-146-234.compute-1.amazonaws.com:5432/d1eqhpt4gjkmfp";

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/recipe.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys=ON", done);
      },
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/testing.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys=ON", done);
      },
    },
  },

  production: {
    client: 'pg',
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  }

};