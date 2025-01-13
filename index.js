const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");
const userRoutes = require("./routes/user"); // Import the user route

mongoose
  .connect("mongodb://localhost:27017/blogify", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRoutes); // All routes in `user` will be prefixed with `/user`

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/signin", (req, res) => {
  res.render("signin");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
