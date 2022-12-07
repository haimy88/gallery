const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getAllUsersModel } = require("../models/authModel");

const login = (req, res) => {
  try {
    const { user, password } = req.body;
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { id: user._id.toString() },
          process.env.TOKEN_SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );
        res.send({
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
          description: user.description,
          token,
        });
      } else {
        res.status(500).send("Incorrect Password");
        return;
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersModel();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { login, getAllUsers };
