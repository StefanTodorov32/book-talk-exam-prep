const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "asd5123hatsd6751hbAHSd";

async function register(username, email, password) {
  const existingUserByUsername = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });
  if (existingUserByUsername) {
    throw new Error("Username is taken!");
  }
  const existingUserByEmail = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (existingUserByEmail) {
    throw new Error("Username is taken!");
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const user = await User.create({
    username,
    email,
    hashedPassword,
  });
  // TODO: Check if registration creates user session
  return createSession(user);
}
async function login(email, password) {
  const user = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (!user) {
    throw new Error("Incorrect Username or Password!");
  }
  const isMatched = await bcrypt.compare(password, user.hashedPassword);
  if (isMatched == false) {
    throw new Error("Incorrect Username or Password!");
  }
  return createSession(user);
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
function createSession({ _id,email, username }) {
  const payload = {
    username,
    email,
    _id,
  };
  return jwt.sign(payload, JWT_SECRET);
}

module.exports = {
  register,
  login,
  verifyToken,
};
