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
app.use("/user", userRoutes);
// Add these middleware before routes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser()); // Add cookie-parser middleware

// Add this middleware before your routes to make user available to all views
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const validatedData = validateToken(token);
      console.log("Token validation result:", validatedData);
      // Store just the user data, not the whole token object
      res.locals.user = validatedData.user;
    } catch (error) {
      console.log("Token validation error:", error);
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
});

// Add before your routes
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Then add routes

// Remove duplicate root route and combine with auth check
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

// Add authentication middleware only for protected routes
// Add this before any protected routes
app.use("/protected", checkForAuthCookie("token"));
// Add other protected routes here...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
