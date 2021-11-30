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
    .query(`SELECT users.id, users.name, users.email, products.image FROM users JOIN products ON owner_id = users.id WHERE users.id = $1`, [id])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {getUser,getUserbyid}
