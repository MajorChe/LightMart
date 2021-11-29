require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
//const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const dbConnection = require('./lib/db');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


 app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("./routes/users");
const usersRoutes = require("./routes/public_routes");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(dbConnection));
app.use("/users", usersRoutes(dbConnection));
// app.use("/api/widgets", widgetsRoutes(dbConnection));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
  // render product template to visualize front end changes -- switch back to index after***
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/favourites", (req, res) => {
  res.render("favourites");
});

app.get("/mypostings", (req, res) => {
  res.render("mypostings");
});

app.get("/product", (req, res) => {
  res.render("product");
});

app.get("/new", (req, res) => {
  res.render("new");
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
