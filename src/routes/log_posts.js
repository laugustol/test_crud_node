const { Router } = require("express");
const router = Router();
const {
    verifyTokenAdmin,
    verifyTokenSupervisor
} = require("../middlewares/verifyToken");

const log_posts = require("../controllers/log_posts");

router.get("/", verifyTokenAdmin, log_posts.getAll);

module.exports = router;
