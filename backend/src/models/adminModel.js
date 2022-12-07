const { User } = require("../data/dbschemas");

const addUserModel = (newUser) => {
  try {
    const user = new User({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
      description: newUser.description,
      isAdmin: false,
    });
    user.save();
    return user;
  } catch (err) {
    return { error: err };
  }
};

const editUserModel = async (editedUser) => {
  try {
    const filter = { _id: editedUser._id };
    let edit = await User.findOneAndUpdate(filter, editedUser);
    return edit;
  } catch (err) {
    return { error: err };
  }
};

const deleteUserModel = async (id) => {
  try {
    const deleted = await User.findByIdAndDelete(id);
    return deleted;
  } catch (err) {
    return { error: err };
  }
};

const getUserByEmail = async (email) => {
  try {
    const queryResult = await User.find({ email: email });
    return queryResult;
  } catch {
    return { error: err };
  }
};

const getAllUsersAdminModel = async () => {
  try {
    const users = await User.find();
    const displayUsers = users.map((item) => {
      const displayedUser = {
        firstName: item.firstName,
        lastName: item.lastName,
        description: item.description,
        email: item.email,
        _id: item._id,
      };
      return displayedUser;
    });
    console.log(displayUsers);
    return displayUsers;
  } catch (err) {
    return { error: err };
  }
};

const getUserById = async (id) => {
  try {
    const queryResult = await User.findById(id);
    return queryResult;
  } catch {
    return { error: err };
  }
};

module.exports = {
  addUserModel,
  editUserModel,
  deleteUserModel,
  getAllUsersAdminModel,
  getUserByEmail,
  getUserById,
};
