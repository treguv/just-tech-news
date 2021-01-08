const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
//set up handlebar.js
const exphbs = require("express-handlebars");
//handlebars helpers
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
//set up session
const session = require("express-session");
const SequlizeStore = require("connect-session-sequelize")(session.Store);

//set up the actual session
const sess = {
  secret: "super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequlizeStore({
    db: sequelize,
  }),
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
//session
app.use(session(sess));

//assign handlebars

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// turn on routes
app.use(routes);

// turn on connection to db and server
//force true means it will drop all the tables after every run
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
