const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const {
  isNewUser,
  passwordsMatch,
  encryptPassword,
} = require("../middleware/adminMiddleware");
const { validateBody } = require("../middleware/validateBody");
const { validateEmail } = require("../middleware/validateEmail");
const { validateToken } = require("../middleware/validateToken");
const { newUserSchema } = require("../data/validationschemas");

router.post(
  "/add",
  validateToken,
  validateBody(newUserSchema),
  validateEmail,
  isNewUser,
  passwordsMatch,
  encryptPassword,
  AdminController.addUser
);

router.put(
  "/edit",
  validateToken,
  validateEmail,
  passwordsMatch,
  encryptPassword,
  AdminController.editUser
);

router.delete("/delete/:id", validateToken, AdminController.deleteUser);

router.get("/users", validateToken, AdminController.getAllUsersAdmin);

module.exports = router;
