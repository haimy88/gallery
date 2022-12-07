const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { addUserModel } = require("../models/adminModel");
require("dotenv").config();

async function addUser(req, res) {
  try {
    const user = addUserModel(req.body);
    if (user.error) {
      throw new Error(user.err);
    }
    res.status(200).send("User added successfully");
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  addUser,
};
