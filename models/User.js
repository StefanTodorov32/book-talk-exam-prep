const mongoose = require("mongoose");

//TODO: Add correct user schema and validations
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [4, "Username must be atleast 4 characters long!"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [10, "Username must be atleast 10 characters long!"],
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});
userSchema.index(
  { username: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);
userSchema.index(
  { email: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
