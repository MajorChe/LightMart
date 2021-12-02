require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
//const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");

// PG database client/connection setup
const dbConnection = require('./lib/db');

// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

//ejs template used to render client side pages
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

//Encrypting cookies using cookie session

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use(express.static("public"));


const publicRoutes = require("./routes/public_routes");
const usersRoutes = require("./routes/users");

// Resource routes defined
app.use("/users", usersRoutes(dbConnection));
app.use("/", publicRoutes(dbConnection));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
