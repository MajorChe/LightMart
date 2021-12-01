// fn getProduct retrieves products from database

const { response } = require("express");
const pool = require("../lib/db");

// default is the ascending case
const getProductLtH = () => {
  return pool
    .query(`
    SELECT *
    FROM products
    ORDER BY price;
    `).then((response => {
      return response.rows;
    }));
};

// define descending case
const getProductHtL = () => {
  return pool
    .query(`
    SELECT *
    FROM products
    ORDER BY price DESC;
    `).then((response => {
      return response.rows;
    }))
}

// getProduct LtH returns a promise
// getProductLtH().then(res => {
//   for(const product in res) {
//     console.log(product);
//   }
// })

// getProductHtL().then(res => {
//   for(const product in res) {
//     console.log(product);
//   }
// })

// export fn to use for product filter
module.exports = {getProductLtH, getProductHtL}

