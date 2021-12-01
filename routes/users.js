/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const pool = require("../lib/db");
//const productFilterFns = require('./01_indexquery');





module.exports = (db) => {
  // create post route for new product form
  // product info taken from form gets added to db
  const newProduct = function(title, price, image, description) {

    // returns pool.query --> used in router.post
  return pool.query( `INSERT INTO products (title, owner_id, price, description, image, is_active, is_sold)
  VALUES ($1, 1,  $2, $3, $4, TRUE, FALSE);`, [title, price, description, image]
  ).then(res => {
    console.log("response")
    return;
  })

}
router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/new", (req, res) => {

  const title = req.body.title;
  const price = req.body.price;
  const image = req.body.image;
  const description = req.body.description;
  const date = Date.now();

  // call fn --> returns a promise
newProduct(title, price, image, description)


  res.redirect('/mypostings')
});

router.get("/product", (req, res) => {
  res.render("product");
})

// returns router object
  return router;
};



