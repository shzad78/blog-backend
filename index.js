const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");
const userRoutes = require("./routes/user");
// const { console } = require("inspector"); // Commented out this line
require("dotenv").config({ path: __dirname + "/.env" });
const cookieParser = require("cookie-parser");

// Import auth functions
const { createToken, validateToken } = require("./services/auth");
// Import middleware
const { checkForAuthCookie } = require("./middleware/authentication");

const SECRET = process.env.JWT_SECRET;
console.log(SECRET);

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

// Add these middleware before routes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser()); // Add cookie-parser middleware

// Use middleware to check for auth cookie
app.use(checkForAuthCookie("token"));

// Then add routes
app.use("/user", userRoutes);

// Remove duplicate root route and combine with auth check
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
