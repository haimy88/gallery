const { User } = require("../data/dbschemas");

const getAllUsersModel = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    return { error: err };
  }
};

module.exports = { getAllUsersModel };
