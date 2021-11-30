// fn getProduct retrieves products from database

const { response } = require("express");
const pool = require("../lib/db");

const getProduct = () => {
  return pool
  // return all rows from products table
    .query(`SELECT * FROM products ORDER BY price ASC;`)
    .then((response) => {
      return response.rows;
    });
};


// export fn to use for product filter
module.exports = {getProduct}
