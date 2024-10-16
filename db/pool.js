require("dotenv").config();
const { Pool, Client } = require("pg");
const CONNECTION_URL = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
    connectionString: CONNECTION_URL
});

const client = new Client({
    connectionString: CONNECTION_URL
});

module.exports = { client, pool }

