const { response } = require("express");
const pool = require("../lib/db");

const getUser = (email) => {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((response) => {
      return response.rows[0];
    });
};

const getUserbyid = (id) => {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {getUser,getUserbyid}
