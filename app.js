const express = require("express"),
  routes = require("./routes"),
  user = require("./routes/user"),
  http = require("http"),
  path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const ejs = require("ejs");
const flash = require("req-flash");
var mysql = require("mysql");

const app = express();
var bodyParser = require("body-parser");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PLEASE ADD YOUR OWN PASSWORD",
  database: "ejssessionauth"
});

connection.connect(function(err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  //console.log("Connected to the MySQL server.");
});

global.db = connection;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* app.use(cookieParser());
app.use(session({ secret: "123" }));
app.use(flash()); */
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(
  session({
    secret: "meriyaad",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);
app.get("/", routes.index);
app.get("/signup", user.signup);
app.post("/signup", user.signup);
app.get("/login", routes.index);
app.post("/login", user.login);
app.get("/dashboard", user.dashboard);
app.get("/profile", user.profile);
app.get("/logout", user.logout);
const PORT = process.env.PORT || "5000";
app.listen(PORT, () => console.log(`Listening server on port:${PORT}`));
