// queries.js
import pool from "./pool.js"

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username])
}

async function searchUsername(searchString) {
  const result = await pool.query("SELECT * FROM usernames WHERE username LIKE ($1)", [searchString + "%"])
  return result.rows
}

async function deleteUsername(username) {
  await pool.query("DELETE FROM usernames WHERE username = $1", [username])
}

export default { getAllUsernames, insertUsername, searchUsername, deleteUsername } // default export object

/**
 search result looks like this (simplified):

{
  command: "SELECT",
  rowCount: 2,
  oid: null,
  rows: [
    { id: 1, username: "Bryan" },
    { id: 2, username: "Bruce" }
  ],
  fields: [ column metadata  ]
}
 */

// pool is your connection pool from the pg (node-postgres) library.
// pool.query(sql, valuesArray) runs an SQL command with optional parameters.
// VALUES ($1) → placeholder for the first parameter.
// $1 is positional parameter #1.
// PostgreSQL replaces $1 with whatever you pass in the array (safely, preventing SQL injection).
// [username]
// This is not a list of multiple usernames.
// It’s an array with a single item, the variable username
// Why? Because pg expects parameters as an array — $1, $2, etc. map to array elements.
// $1 → username
// If you had "INSERT INTO users (first, last) VALUES ($1, $2)", you’d pass [firstName, lastName].

