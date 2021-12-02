/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const productFns = require("../db/uQueries");
const userfn = require("../db/01_indexquery");
const timeago = require('timeago.js')

module.exports = (db) => {
  router.get("/myfavourites", (req, res) => {
    const session_id = req.session.id;
    if (!req.session.id) {
      res.redirect("/");
    } else {
      productFns.getUsersFavourites(req.session.id).then((data) => {
        let favourites = data;
        const user = req.session.id;
        console.log(favourites)
        const templateVars = { favourites, user, session_id};
        res.render("favourites", templateVars);
      });
    }
  });

  router.get("/mypostings/", (req, res) => {
    const session_id = req.session.id;
    if (!req.session.id) {
      res.redirect("/");
    } else {
      let sold = [];
      let postings = [];
      const user = req.session.id;
      productFns.getUsersProducts(req.session.id).then((data) => {
        //console.log("is", data);
        if (data.length === 0) {
          postings.push(1);
        }

        for (let i of data) {
          if (i.is_sold === false) {
            postings.push(i);
          }
        }
        for (let i of data) {
          if (i.is_sold === true) {
            sold.push(i);
          }
        }
        const templateVars = { postings, user, sold, session_id };
        res.render("mypostings", templateVars);
      });
    }
  });

  router.get("/new", (req, res) => {
    const session_id = req.session.id;
    if (!req.session.id) {
      res.redirect("/");
    } else {
      userfn.getUserbyid(req.session.id).then((user) => {
        const templateVars = { user, session_id };
        res.render("new", templateVars);
      });
    }
  });

  router.post("/new", (req, res) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;
    productFns.newProduct(title, price, description, image).then((res) => {
      console.log(res);
    });
    res.redirect("/users/mypostings");
  });

  router.get("/:id", (req, res) => {
    const session_id = req.session.id;
    if (!req.session.id) {
      res.redirect("/");
    } else {
      productFns.getProductById(req.params.id).then((product) => {
        const templateVars = { product, session_id };
        res.render("product", templateVars);
      });
    }
  });

  router.post("/product/:id", (req, res) => {
    if (!req.session.id) {
      res.redirect("/");
    } else {
      productFns.markAsSold(req.session.id, req.params.id).then((data) => {
        res.redirect(`/users/mypostings`);
      });
    }
  });

  router.post("/delete/:id", (req, res) => {
    productFns
      .deleteUsersProduct(req.session.id, req.params.id)
      .then((data) => {
        res.redirect(`/users/mypostings`);
      });
  });

  router.post("/add/:id", (req, res) => {
    console.log(req.body);
    productFns.addFavourite(req.session.id, req.params.id).then((data) => {
      res.redirect(`/users/myfavourites`);
    });
  });
  return router;
};
