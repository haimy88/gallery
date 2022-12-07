const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const {
  isNewUser,
  passwordsMatch,
  encryptPassword,
} = require("../middleware/adminMiddleware");
const { validateBody } = require("../middleware/validateBody");
const { newUserSchema } = require("../data/validationschemas");

router.post(
  "/add",
  validateBody(newUserSchema),
  isNewUser,
  passwordsMatch,
  encryptPassword,
  AdminController.addUser
);

module.exports = router;
