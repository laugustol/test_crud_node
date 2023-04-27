const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();
const {
    verifyTokenAdmin,
    verifyTokenSupervisor
} = require("../middlewares/verifyToken");

const ratings = require("../controllers/ratings");

const validateRating = [
    body("post_id").isNumeric().withMessage("Invalid post_id"),
    body("rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be a number between 1 and 5")
];
router.post("/add", validateRating, ratings.add);

router.delete("/delete/:id", ratings.delete);

module.exports = router;
