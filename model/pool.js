require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  SSL: {
    require: true,
    rejectUnauthorized: false,
  },
});

module.exports = pool;
