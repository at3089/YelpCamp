const express = require("express"),
  app = express(),
  port = 3000,
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// SCHEMA SETUP
const Campground = require("./models/campground");
const Commment = require("./models/comment");

// Seed DB
// const seedDB = require("./seeds");
// seedDB();

app.get("/", function(req, res) {
  res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newCampground = { name: name, image: image, description: description };
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // Redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        // render show template with that campground
        res.render("show", { campground: foundCampground });
      }
    });
});

app.listen(port, () =>
  console.log(`The YelpCamp Server Has Started! ... listening on port ${port}!`)
);
