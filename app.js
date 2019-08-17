const express = require("express"),
  routes = require("./routes"),
  user = require("./routes/user");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const ejs = require("ejs");
const flash = require("req-flash");
const app = express();

app.use(cookieParser());
app.use(session({ secret: "123" }));
app.use(flash());
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", routes.index);
app.get("/signup", user.signup);
app.post("/signup", user.signup);

const PORT = process.env.PORT || "5000";
app.listen(PORT, () => console.log(`Listening server on port:${PORT}`));
