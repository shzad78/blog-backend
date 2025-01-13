const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/signin", (req, res) => {
  res.render("signin");
  // try {
  //     const users = await User.find();
  //     res.json(users);
  // } catch (err) {
  //     res.status(500).json({ error: "Error getting users", details: err.message });
  // }
});
router.get("/signup", (req, res) => {
  res.render("signup");
  // try {
  //     const users = await User.find();
  //     res.json(users);
  // } catch (err) {
  //     res.status(500).json({ error: "Error getting users", details: err.message });
  // }
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save(); // Password hashing handled by pre-save middleware
    res.json({ message: "User created successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error creating user", details: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (!user) {
      console.log(`User not found with email: ${email}`);
      return res.status(404).render("signin", { errorMessage: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`Invalid password for user: ${email}`);
      return res.status(401).render("signin", { errorMessage: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');

  } catch (err) {
    console.error(`Error logging in: ${err.message}`);
    res.status(500).json({ error: "Error logging in", details: err.message });
  }
});


module.exports = router;
