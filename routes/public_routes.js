/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const productFns = require('../db/uQueries');

module.exports = (db) => {
// GET /posts/:id
router.get('/myfavourites/:id', (req, res) => {
  productFns.getUsersFavourites(req.params.id)
    .then((data) => {
      let favourites = data
      const templateVars = { favourites }
      console.log (templateVars)
      res.render("favourites", templateVars);
    });
});

router.get('/mypostings/:id', (req, res) => {
  productFns.getProductById(req.params.id)
    .then((product) => {
      res.json(product);
    });
});

router.get('//:id', (req, res) => {
  productFns.getProductById(req.params.id)
    .then((product) => {
      res.json(product);
    });
});

router.get('/:id', (req, res) => {
  productFns.getProductById(req.params.id)
    .then((product) => {
      res.json(product);
    });
});
router.get('/:id', (req, res) => {
  productFns.getProductById(req.params.id)
    .then((product) => {
      res.json(product);
    });
});
return router
};

