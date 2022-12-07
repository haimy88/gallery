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
const { newUserSchema } = require("../data/validationschemas");

router.post(
  "/add",
  validateBody(newUserSchema),
  validateEmail,
  isNewUser,
  passwordsMatch,
  encryptPassword,
  AdminController.addUser
);

router.put(
  "/edit",
  validateEmail,
  passwordsMatch,
  encryptPassword,
  AdminController.editUser
);

router.delete("/delete/:id", AdminController.deleteUser);

router.get("/users", AdminController.getAllUsersAdmin);

module.exports = router;
