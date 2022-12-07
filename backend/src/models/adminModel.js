const { User } = require("../data/dbschemas");

function addUserModel(newUser) {
  try {
    const user = new User({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
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

async function getUserByEmail(email) {
  try {
    const queryResult = await User.find({ email: email });
    return queryResult;
  } catch {
    return { error: err };
  }
}

module.exports = {
  addUserModel,
  getUserByEmail,
};
