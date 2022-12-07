const { User } = require("../data/dbschemas");

const getAllUsersModel = async () => {
  try {
    console.log("made it here");
    const users = await User.find();
    return users;
  } catch (err) {
    return { error: err };
  }
};

module.exports = { getAllUsersModel };
