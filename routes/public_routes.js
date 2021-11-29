const express = require("express");
const router = express.Router();
const userfn = require("../db/01_indexquery");


module.exports = (db) => {
  router.get("/", (req, res) => {
    const session_id = req.session.id;
    const templateVars = {session_id}
    res.render("index",templateVars);
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

  return router;
};
