require("dotenv").config();

//test comment for webhook on discord
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const signale = require("signale");

// Setting up port
let PORT = process.env.PORT || 3000;

//secret
let SECRET = process.env.SESSION_SECRET;

//discord auth
const passport = require("passport");
const session = require("express-session");
const discordStrategy = require("./strategies/discordstrategy.js");

const authRoute = require("./routes/auth");
const userInfoRoute = require("./routes/userInfo");

app.use(
  session({
    secret: SECRET,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/userInfo", userInfoRoute);

app.listen(PORT, () => {
  signale.success(`Server running on http://localhost:${PORT}`);
});
