const express = require("express"),
  app = express(),
  port = 3000,
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user");

// requiring routes
const indexRoutes = require("./routes/index"),
  campgroundRoutes = require("./routes/campground"),
  commentRoutes = require("./routes/comment");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Seed DB
// const seedDB = require("./seeds");
// seedDB();

// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "The quick brown fox",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to add currentUser variable to every route
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Listen on Port 3000
app.listen(port, () =>
  console.log(`The YelpCamp Server Has Started! ... listening on port ${port}!`)
);
