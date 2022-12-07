const { User } = require("../data/dbschemas");

function addUserModel(newUser) {
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
}

async function editUserModel(editedUser) {
  try {
    const filter = { _id: editedUser._id };
    console.log(editedUser);
    let edit = await User.findOneAndUpdate(filter, editedUser);
    return edit;
  } catch (err) {
    return { error: err };
  }
}

async function getUserByEmail(email) {
  try {
    const queryResult = await User.find({ email: email });
    return queryResult;
  } catch {
    return { error: err };
  }
}

async function getUserById(id) {
  try {
    const queryResult = await User.findById(id);
    return queryResult;
  } catch {
    return { error: err };
  }
}

module.exports = {
  addUserModel,
  editUserModel,
  getUserByEmail,
  getUserById,
};
