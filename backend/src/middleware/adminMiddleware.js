const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../models/adminModel");

const isNewUser = async (req, res, next) => {
  const user = await getUserByEmail(req.body.email);
  if (user.length !== 0) {
    res.status(400).send("User Already Exists");
    return;
  }
  next();
};

const passwordsMatch = async (req, res, next) => {
  if (req.body.password !== req.body.repassword) {
    res.status(400).send("Passwords do not match");
    return;
  }
  next();
};

const encryptPassword = (req, res, next) => {
  const saltRounds = 10;
  if (req.body.password) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        res.status(500).send(err.message);
      }
      req.body.password = hash;
      next();
    });
  } else {
    next();
  }
};

module.exports = {
  isNewUser,
  passwordsMatch,
  encryptPassword,
  encryptPassword,
};
