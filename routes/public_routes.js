const { request } = require("express");
const express = require("express");
const router = express.Router();
const userfn = require("../db/01_indexquery");
const getProductbyPrice = require("../db/02_productquery");
const pool = require("../lib/db");



module.exports = (db) => {


  router.get("/", (req, res) => {
    const session_id = req.session.id;
    userfn.getproducts().then((user) => {
      const templateVars = { user , session_id};
      res.render("index", templateVars);
    });
  });

  router.post("/", (req, res) => {
    const session_id = req.session.id;
    if (req.body.value === "asc") {
      console.log("up we go");
      userfn.getProductLowToHigh().then((user) => {
        const templateVars = { user,session_id };
        res.render("index", templateVars);
      });
    }
    if (req.body.value === "desc") {
      console.log("down we go");
      userfn.getProductHighToLow().then((user) => {
        const templateVars = { user, session_id };

        res.render("index", templateVars);
      });
    }
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





  return router;
};



