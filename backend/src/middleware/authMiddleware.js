const { getUserByEmail } = require("../models/adminModel");

const isExistingUser = async (req, res, next) => {
  const user = await getUserByEmail(req.body.email);
  if (user.length === 0) {
    res.status(400).send("User with this email does not exist");
    return;
  }
  req.body.user = user[0];
  next();
};

module.exports = { isExistingUser };
