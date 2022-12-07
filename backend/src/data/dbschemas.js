const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  description: String,
  isAdmin: { type: Boolean, default: false },
  created: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
