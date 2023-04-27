const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();
const {
    verifyTokenAdmin,
    verifyTokenSupervisor
} = require("../middlewares/verifyToken");
const reviews = require("../controllers/reviews");

const validateReview = [
    body("post_id").isNumeric().withMessage("Invalid post_id"),
    body("comment").isString().isEmpty().withMessage("Invalid comment")
];

const validateReviewUpdate = [
    body("user_id").isNumeric().withMessage("Invalid user_id"),
    body("post_id").isNumeric().withMessage("Invalid post_id"),
    body("comment").isString().isEmpty().withMessage("Invalid comment")
];

router.post("/add", validateReview, reviews.add);

router.put("/update/:id", validateReviewUpdate, reviews.update);

router.delete("/delete/:id", reviews.delete);

module.exports = router;
