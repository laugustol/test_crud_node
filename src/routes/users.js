const { Router } = require("express");
const { body } = require("express-validator");

const router = Router();
const {
    verifyTokenAdmin,
    verifyTokenSupervisor
} = require("../middlewares/verifyToken");
const users = require("../controllers/users");
const validateLogin = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
        .isLength({ min: 4 })
        .withMessage("Password must be at least 4 characters")
];
const validateUser = [
    body("first_name")
        .isString()
        .isLength({ min: 3 })
        .withMessage("Invalid first_name"),
    body("last_name")
        .isString()
        .isLength({ min: 3 })
        .withMessage("Invalid last_name"),
    body("permission")
        .isString()
        .isLength({ min: 5 })
        .withMessage("Invalid permission")
];

router.post("/login", validateLogin, users.login);

router.get("/", verifyTokenAdmin, users.getAll);

router.post("/add", [validateLogin, validateUser], verifyTokenAdmin, users.add);

router.put(
    "/update/:id",
    [validateLogin, validateUser],
    verifyTokenAdmin,
    users.update
);

router.delete("/delete/:id", verifyTokenAdmin, users.delete);

module.exports = router;
