const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
<<<<<<< HEAD

mongoose.connect("mongodb://localhost:27017/auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
=======
const User = require("./models/user");
const userRoutes = require("./routes/user"); // Import the user route

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Failed to connect to MongoDB", err);
>>>>>>> ee7b07bb3c0921cf7ad9fc3397679ee39453d2ff
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
