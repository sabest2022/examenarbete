const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  imageUrl: { type: String },
  balance: { type: Number },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };
