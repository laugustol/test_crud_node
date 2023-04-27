const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();
const {
    verifyTokenAdmin,
    verifyTokenSupervisor
} = require("../middlewares/verifyToken");

const posts = require("../controllers/posts");

const validatePost = [
    body("user_id").isNumeric().withMessage("Invalid user_id"),
    body("title").isString().isLength({ min: 2 }).withMessage("Invalid title"),
    body("description")
        .isString()
        .isLength({ min: 5 })
        .withMessage("Invalid description")
];
const validatePostUpdate = [
    body("title").isString().isLength({ min: 2 }).withMessage("Invalid title"),
    body("description")
        .isString()
        .isLength({ min: 5 })
        .withMessage("Invalid description")
];

router.get("/", posts.getAll);

router.get("/:id", posts.getOne);

router.post("/add", validatePost, verifyTokenAdmin, posts.add);

router.put(
    "/update/:id",
    validatePostUpdate,
    verifyTokenSupervisor,
    posts.update
);

router.delete("/delete/:id", verifyTokenAdmin, posts.delete);

module.exports = router;
