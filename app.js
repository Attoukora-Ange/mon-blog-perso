require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport"); 
const DATA_BASE = require("./controllers/base");
const Route = require("./controllers/users/Route");
const ROUTE = require("./controllers/articles/Route");
const flash = require("express-flash");
const methodeOveride = require("method-override");


const morgan = require("morgan");

const app = express();
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 30 * 60 * 1000, 
      // sameSite: "lax",
    },
  })
);
app.use(passport.session());
app.use(passport.initialize());
app.use(bodyParser.json());

app.use(methodeOveride("_method"));
app.use(flash());
app.use((req, res, next) => {
  res.locals.message_success = req.flash('message_success');
  res.locals.message_error = req.flash('message_error');
  next();
})
app.use(express.static("public"));
app.use("css", express.static("public/css"));
app.use("js", express.static("public/js"));
app.use("images", express.static("public/images"));


app.use("/admin", ROUTE);
app.use("/", Route);
app.use((req, res) => res.status(404).send('<h1>Erreur:404 Page no trouvée...</h1>'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server démaré au port " + PORT));
