// let dbParams = {};
// if (process.env.DATABASE_URL) {
//   dbParams.connectionString = process.env.DATABASE_URL;
// } else {
//   dbParams = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
//   };
// }

// module.exports = dbParams;


const { Pool } = require("pg");

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432
};

const client = new Pool(config);

client.connect(() => {
  console.log('connected to database');
});

module.exports = client;
