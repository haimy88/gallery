const { User } = require("../data/dbschemas");

const getAllUsersModel = async () => {
  try {
    const users = await User.find();
    const displayUsers = users.map((item) => {
      const displayedUser = {
        firstName: item.firstName,
        lastName: item.lastName,
        description: item.description,
      };
      return displayedUser;
    });
    return displayUsers;
  } catch (err) {
    return { error: err };
  }
};

module.exports = { getAllUsersModel };
