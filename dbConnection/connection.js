const { Pool, Client } = require("pg");
const dotenv = require("dotenv");
const pg = require("pg");
// init
dotenv.config();
const variable = process.env;
const connectDb = async () => {
  try {
    const client = new Client({
      user: variable.PGUSER,
      host: variable.PGHOST,
      database: variable.PGDATABASE,
      password: variable.PGPASSWORD,
      port: variable.PGPORT,
    });

    await client.connect();
    return client;
  } catch (error) {
    return error;
  }
};
// const connect =connectDb();

module.exports.db = connectDb();
