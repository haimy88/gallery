const {
  addUserModel,
  editUserModel,
  deleteUserModel,
  getAllUsersAdminModel,
} = require("../models/adminModel");
require("dotenv").config();

const addUser = async (req, res) => {
  try {
    const user = addUserModel(req.body);
    if (user.error) {
      throw new Error(user.err);
    }
    res.status(200).send("User added successfully");
  } catch (err) {
    res.status(500).send(err);
  }
};

const editUser = async (req, res) => {
  try {
    const edit = editUserModel(req.body);
    if (edit.error) {
      throw new Error(edit.error);
    }
    res.status(200).send("User edited successfully");
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log(req.params);
    const deleted = deleteUserModel(req.params.id);
    if (deleted.error) {
      throw new Error(deleted.error);
    }
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllUsersAdmin = async (req, res) => {
  try {
    const users = await getAllUsersAdminModel();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addUser,
  editUser,
  deleteUser,
  getAllUsersAdmin,
};
