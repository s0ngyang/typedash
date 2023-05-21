const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:downbad420@localhost:5432/postgres');

module.exports = db;