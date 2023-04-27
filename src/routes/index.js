const { Router } = require("express");
const router = Router();
const {
    verifyTokenAdmin,
    verifyTokenSupervisor
} = require("../middlewares/verifyToken");
const users = require("./users");
const posts = require("./posts");
const reviews = require("./reviews");
const ratings = require("./ratings");
const log_posts = require("./log_posts");

router.get("/", async (req, res) => {
    res.send("test");
});

router.use("/users", users);

router.use("/posts", posts);

router.use("/reviews", reviews);

router.use("/ratings", ratings);

router.use("/log-posts", log_posts);

module.exports = router;
