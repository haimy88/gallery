const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const { validateBody } = require("../middleware/validateBody");
const { loginSchema } = require("../data/validationschemas");
const { isExistingUser } = require("../middleware/authMiddleware");

router.post(
  "/login",
  validateBody(loginSchema),
  isExistingUser,
  AuthController.login
);

router.get("/allusers", AuthController.getAllUsers);

module.exports = router;
