const Router = require("express").Router;
const router = Router();

const Blog = require("../models/blog");
const User = require("../models/user");

router.get("/addblog", async (req, res) => {
    res.render("addblog", { user: req.user });
    });
module.exports = router;