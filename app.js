const express = require("express");
const app = express();
const port = 3001;

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  let campgrounds = [
    {
      name: "Salmon Creek",
      image:
        "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"
    },
    {
      name: "Granite Hill",
      image:
        "https://images.unsplash.com/photo-1546890975-7596e98cdbf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    },
    {
      name: "Mountain Goat's Rest",
      image:
        "https://images.unsplash.com/photo-1514960821766-38f2cac1e2d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80"
    }
  ];
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.listen(port, () =>
  console.log(`The YelpCamp Server Has Started! ... listening on port ${port}!`)
);
