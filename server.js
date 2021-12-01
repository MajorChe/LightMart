require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
//const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
app.use(cookieParser());

// PG database client/connection setup
const dbConnection = require('./lib/db');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

 app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const publicRoutes = require("./routes/public_routes");
const usersRoutes = require("./routes/users");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(dbConnection));
app.use("/", publicRoutes(dbConnection));
app.use("/myfavourites", usersRoutes(dbConnection));

// Note: mount other resources here, using the same pattern above
app.get('/post', (req,res) => {
  res.render('product')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
