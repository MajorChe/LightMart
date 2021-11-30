const express = require("express");
const router = express.Router();
const userfn = require("../db/01_indexquery");
const {getProduct} = require("../db/02_productquery");


module.exports = (db) => {
  router.get("/", (req, res) => {
    const session_id = req.session.id;
    userfn.getUserbyid(session_id)
    .then(user => {
      const templateVars = {user}
      res.render("index", templateVars);
    })
  });

  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.post("/login", (req, res) => {
    userfn
      .getUser(req.body.email)
      .then((user) => {
        if (user.password === req.body.password) {
          req.session.id = user.id;
          res.redirect("/");
        } else {
          res.send("Please check your credentials");
        }
      })
      .catch((err) => {
        res.send("Please check your credentials");
      });
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  // create post route for new product form
  // product info taken from form gets added to db
  router.post("/mypostings", (req, res) => {

    const newProduct = `INSERT INTO products (title, owner_id, price, description, image, date_created, is_active, is_sold)
    VALUES (${req.body.title}, ${req.body.price}, ${req.body.description}, ${req.body.image}, Now(), TRUE, FALSE);`

    res.redirect('/mypostings/')
  });



  return router;
};
